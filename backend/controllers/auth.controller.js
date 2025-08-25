import bcrypt from "bcrypt";
import { sql } from "./db.js"; 

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

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await sql`
      INSERT INTO users (fullname, username, email, password, role)
      VALUES (${fullname}, ${username}, ${email}, ${hashedPassword}, ${role})
      RETURNING *;
    `;

    res.status(201).json({ message: "User created successfully!", user: result[0] });

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

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    
    res.status(200).json({ message: "Login successful", user: { id: user.id, fullname: user.fullname, role: user.role, email: user.email } });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const logout=async()=>{
    console.log("logout")
}