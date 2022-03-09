import express from "express";
const router = express.Router();

import {
  getAllProjects,
  createProject,
  updateProjectInfo,
  deleteProject,
  addUserToProject,
} from "../controllers/projectController";
import authMiddleware from "../middlewares/authMiddleware";

router.route("/").get(authMiddleware, getAllProjects).post(authMiddleware, createProject);
router.route("/:id").put(authMiddleware, updateProjectInfo).delete(authMiddleware, deleteProject);
router.route("/:id/user/:userID").put(authMiddleware, addUserToProject);

export default router;
