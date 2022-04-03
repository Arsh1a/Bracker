import express from "express";
const router = express.Router();

import { getAllInvites, handleInvite, login, register } from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";

router.route("/register").post(register);
router.route("/login").post(login);

router.route("/invites").get(authMiddleware, getAllInvites);
router.route("/invites/:inviteID").post(authMiddleware, handleInvite);

export default router;
