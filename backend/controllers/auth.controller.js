// import bcrypt from "bcrypt";
import { sql } from "../config/db.js"; 
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export const generateToken=async(userId,res)=>{

        const token=jwt.sign({userId},process.env.JWT_SECRET,{
            expiresIn:"15d"
        })

        res.cookie("jwt",token,{
            maxAge: 15 * 24 * 60 * 60 *1000,
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV!="development"

        })

}

export const signup = async (req, res) => {
  try {
    const { fullname, username, email, password, role } = req.body;

    if (!fullname || !username || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email address!" });
    }

    if (password.length < 6 || password.length > 12) {
      return res.status(400).json({ message: "Password must be 6-12 characters long!" });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ 
        message: "Password must contain uppercase, lowercase, number, and special character!" 
      });
    }

    if (!["admin", "student"].includes(role)) {
      return res.status(400).json({ message: "Role must be either 'admin' or 'student'" });
    }
    
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const result = await sql`
      INSERT INTO users (fullname, username, email, password, role)
      VALUES (${fullname}, ${username}, ${email}, ${hashedPassword}, ${role})
      RETURNING *;
    `;

    if (result && result[0]) {
      generateToken(result[0].id, res);
      return res.status(201).json({
        success: true,
        message: "User signup successful",
        data: result[0],
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Error creating user" });
    }

    // res.status(201).json({ message: "User created successfully!", user: result[0] });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const users = await sql`
      SELECT * FROM users WHERE email = ${email};
    `;

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = users[0];

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    
    res.status(200).json({ message: "Login successful", user: { id: user.id, fullname: user.fullname, role: user.role, email: user.email } });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ success: true, message: "successfully logout" });
  } catch (error) {
    console.log("something went wrong", error.message);
    req.status(500).json({ success: false, message: "internal server error" });
  }
};
