import express from "express";
const router = express.Router();

import {
  getAllProjects,
  projectSession,
  createProject,
  updateProjectInfo,
  deleteProject,
  inviteToProject,
} from "../controllers/projectController";

import { createTask, deleteTask, getTasks, updateTask } from "../controllers/taskController";

import authMiddleware from "../middlewares/authMiddleware";

router.route("/").get(authMiddleware, getAllProjects).post(authMiddleware, createProject);
router
  .route("/:projectID")
  .get(authMiddleware, projectSession)
  .patch(authMiddleware, updateProjectInfo)
  .delete(authMiddleware, deleteProject);
router.route("/:projectID/users").patch(authMiddleware, inviteToProject);

export default router;
