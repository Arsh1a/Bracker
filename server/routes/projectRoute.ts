import express from "express";
const router = express.Router();

import {
  getAllProjects,
  createProject,
  updateProjectInfo,
  deleteProject,
  inviteToProject,
} from "../controllers/projectController";

import {
  createTask,
  deleteTask,
  getTasksForProject,
  updateTask,
} from "../controllers/taskController";

import authMiddleware from "../middlewares/authMiddleware";

/*Project routes*/
router.route("/").get(authMiddleware, getAllProjects).post(authMiddleware, createProject);
router
  .route("/:projectID")
  .patch(authMiddleware, updateProjectInfo)
  .delete(authMiddleware, deleteProject);
router.route("/:projectID/users").patch(authMiddleware, inviteToProject);
/*Task routes*/
router
  .route("/:projectID/tasks")
  .get(authMiddleware, getTasksForProject)
  .post(authMiddleware, createTask);
router
  .route("/:projectID/tasks/:taskID")
  .patch(authMiddleware, updateTask)
  .delete(authMiddleware, deleteTask);

export default router;
