import express from "express";
const router = express.Router();

import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
  countTasks,
} from "../controllers/taskController";

import authMiddleware from "../middlewares/authMiddleware";

router.route("/:projectID").get(authMiddleware, getTasks).post(authMiddleware, createTask);
router.route("/:projectID/count").get(authMiddleware, countTasks);
router.route("/:taskID").patch(authMiddleware, updateTask).delete(authMiddleware, deleteTask);

export default router;
