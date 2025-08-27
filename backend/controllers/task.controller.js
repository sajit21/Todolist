import { sql } from "../config/db.js";

export const doTask = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "user is not admin" });
    }
    const { title, priority, due_date, status, studentId } = req.body;

    if (!title || !priority || !studentId || !status || !due_date) {
      return res
        .status(401)
        .json({ success: false, message: "missing fields" });
    }

   const result = await sql`
  INSERT INTO list (id, student_id, priority, title, status, due_date)
  VALUES (
    COALESCE(
      (
        SELECT MIN(t1.id + 1)
        FROM list t1
        LEFT JOIN list t2 ON t1.id + 1 = t2.id
        WHERE t2.id IS NULL
      ),
      
    ),
    ${studentId},
    ${priority},
    ${title},
    ${status},
    ${due_date}
  )
  RETURNING *;
`;


    res.status(201).json({
      success: true,
      message: "task assigned successfully",
      data: result[0],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "user is not admin" });
    }

    const { id } = req.params;
    const { title, priority, status, due_date, studentId } = req.body;

    if (!title || !priority || !status || !due_date || !studentId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    const result = await sql`
      UPDATE list
      SET title = ${title},
          priority = ${priority},
          status = ${status},
          due_date = ${due_date},
          student_id = ${studentId}
      WHERE id = ${id}
      RETURNING *;
    `;

    if (result.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res.json({
      success: true,
      message: "Task updated successfully",
      data: result[0],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "user is not admin" });
    }

    const { id } = req.params;

    const result = await sql`
      DELETE FROM list
      WHERE id = ${id}
      RETURNING *;
    `;

    if (result.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res.json({
      success: true,
      message: "Task deleted successfully",
      data: result[0],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
