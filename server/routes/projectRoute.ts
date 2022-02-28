import express from "express";
const router = express.Router();

import { createProject, deleteProject } from "../controllers/projectController";

router.route("/").post(createProject).delete(deleteProject);

export default router;
