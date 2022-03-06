import express from "express";
const router = express.Router();

import { createProject, deleteProject } from "../controllers/projectController";
import authMiddleware from "../middlewares/authMiddleware";

router.route("/").post(authMiddleware, createProject).delete(authMiddleware, deleteProject);

export default router;
