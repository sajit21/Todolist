import express from "express"
// import {dotask,updatetask,deletetask} from "../controllers/task.controller.js"
import { dotask } from "../controllers/task.controller.js";
import { ProtectRoute } from "../middleware/protectRoute.js";
const router=express.Router();
router.post("/do",ProtectRoute,dotask)
// router.post("/update",ProtectRoute,updatetask)
// router.post("/delete",ProtectRoute,deletetask)


export default router;