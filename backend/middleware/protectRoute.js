import jwt from "jsonwebtoken";
import { sql } from "../config/db.js";

export const ProtectRoute = async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);

  if (!token) {
    return res
      .status(401)
      .json({
        success: false,
        message: "token not available, unauthorized user",
      });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    const user = await sql`SELECT * FROM users where id=${decoded.userId}`;
    console.log(user);

    if (user.length == 0) {
      return res
        .status(401)
        .json({ success: "false", message: "user not found" });
    }

    if (user[0].role !== "admin") {
      return res
        .status(401)
        .json({ success: false, message: "you're not the admin" });
    }
    req.user = user[0];
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


export const Isadmin=async(req , res ,next)=>{
    if(!req.user || req.user.role !== "admin")
    {
        return res.status(401).json({success:false,message:"admin access denied"})
    }
    next();
}
