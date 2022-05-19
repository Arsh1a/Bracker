import express from "express";
const router = express.Router();

import {
  getAllProjects,
  projectSession,
  createProject,
  updateProjectInfo,
  deleteProject,
  inviteToProject,
  getProjectMembers,
} from "../controllers/projectController";

import authMiddleware from "../middlewares/authMiddleware";

router.route("/").get(authMiddleware, getAllProjects).post(authMiddleware, createProject);
router
  .route("/:projectID")
  .get(authMiddleware, projectSession)
  .patch(authMiddleware, updateProjectInfo)
  .delete(authMiddleware, deleteProject);
router
  .route("/:projectID/users")
  .get(authMiddleware, getProjectMembers)
  .patch(authMiddleware, inviteToProject);

export default router;
