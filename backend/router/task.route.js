import express from "express"
import {doTask,updateTask,deleteTask} from "../controllers/task.controller.js"
// import { dotask } from "../controllers/task.controller.js";
import { ProtectRoute } from "../middleware/protectRoute.js";
const router=express.Router();
router.post("/do",ProtectRoute,doTask)
router.put("/update/:id",ProtectRoute,updateTask)
router.delete("/delete/:id",ProtectRoute,deleteTask)


export default router;