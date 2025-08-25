import express from "express";
import { sql } from "./config/db.js";
import userRoute from "./router/auth.route.js"
// import taskRoute from "./router/task.route.js"
const app=express();




app.use(express.json());
const PORT=process.env.Port || 3000;
app.use("/api/auth",userRoute)
// app.use("/api/task",taskRoute)

async function createUsersTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        fullname VARCHAR(100) NOT NULL,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL CHECK (role IN ('admin','student')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("Users table created or already exists!");
  } catch (error) {
    console.log("Something went wrong creating users table:", error.message);
  }
}

async function createListTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS List (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        priority VARCHAR(20) NOT NULL,
        status VARCHAR(20) DEFAULT 'to-do',
        due_date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("List table created or already exists!");
  } catch (error) {
    console.log("Something went wrong creating List table:", error.message);
  }
}

async function startServer() {

  try {
    await createUsersTable();
    await createListTable();
    app.listen(PORT, () => {
      console.log("Server is running on " + PORT);
    });
  } catch (error) {
    console.log("internal server error", error.message);
  }
}
startServer();

