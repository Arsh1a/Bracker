import express from "express";
const router = express.Router();

import {
  createIssue,
  deleteIssue,
  getIssues,
  updateIssue,
  countIssues,
} from "../controllers/issueController";

import authMiddleware from "../middlewares/authMiddleware";

router.route("/:projectID").get(authMiddleware, getIssues).post(authMiddleware, createIssue);
router.route("/:projectID/count").get(authMiddleware, countIssues);
router.route("/:issueID").patch(authMiddleware, updateIssue).delete(authMiddleware, deleteIssue);

export default router;
