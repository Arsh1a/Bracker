import express from "express";
const router = express.Router();

import {
  createTask,
  deleteTask,
  getTasksForProject,
  updateTask,
} from "../controllers/taskController";
import authMiddleware from "../middlewares/authMiddleware";

router.route("/").get(authMiddleware, getTasksForProject).post(authMiddleware, createTask);
router.route("/:id").put(authMiddleware, updateTask).delete(authMiddleware, deleteTask);

export default router;
