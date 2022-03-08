import express from "express";
const router = express.Router();

import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController";
import authMiddleware from "../middlewares/authMiddleware";

router.route("/").get(authMiddleware, getAllProjects).post(authMiddleware, createProject);
router.route("/:id").put(authMiddleware, updateProject).delete(authMiddleware, deleteProject);

export default router;
