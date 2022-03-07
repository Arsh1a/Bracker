import express from "express";
const router = express.Router();

import { createProject, updateProject, deleteProject } from "../controllers/projectController";
import authMiddleware from "../middlewares/authMiddleware";

router.route("/").post(authMiddleware, createProject).delete(authMiddleware, deleteProject);
router.route("/:id").put(authMiddleware, updateProject);

export default router;
