import express from "express";
const router = express.Router();

import { createTask, deleteTask } from "../controllers/taskController";
import authMiddleware from "../middlewares/authMiddleware";

router.route("/").post(authMiddleware, createTask).delete(authMiddleware, deleteTask);

export default router;
