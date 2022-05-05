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

/*Project routes*/
router.route("/").get(authMiddleware, getAllProjects).post(authMiddleware, createProject);
router
  .route("/:projectID")
  .get(authMiddleware, projectSession)
  .patch(authMiddleware, updateProjectInfo)
  .delete(authMiddleware, deleteProject);
router.route("/:projectID/users").patch(authMiddleware, inviteToProject);

/*Task routes*/
router.route("/:projectID/task").get(authMiddleware, getTasks).post(authMiddleware, createTask);
router
  .route("/:projectID/task/:taskID")
  .patch(authMiddleware, updateTask)
  .delete(authMiddleware, deleteTask);

export default router;
