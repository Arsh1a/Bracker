import express from "express";
const router = express.Router();

import { createTask, deleteTask } from "../controllers/taskController";
import authMiddleware from "../middlewares/authMiddleware";

router.route("/").post(authMiddleware, createTask).delete(deleteTask);

export default router;
