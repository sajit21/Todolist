

import { sql } from "../config/db.js";

export const dotask=async(req,res)=>{
    try {
if(!req.user || req.user.role !== "admin"){
    return res.status(403).json({message:"user is not admin"})   
}
   const{title,status,due_date,studentId}=req.body;

   if(!title || !studentId || !due_date){
    return res.status(401).json({success:false,message:"missing fields"})
   }
   
const result = await sql`
      INSERT INTO tasks (student_id, title, status, due_date)
      VALUES (${studentId}, ${title}, ${status}, ${due_date})
      RETURNING *;
    `;

    res.status(201).json({
      success: true,
      message: "Task assigned successfully",
      data: result[0],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// export const updatetask=async(req,res)=>{
//     try {
        
//     } catch (error) {
        
//     }

// }
// export const deletetask=async(req,res)=>{
//     try {
        
//     } catch (error) {
        
//     }

// }