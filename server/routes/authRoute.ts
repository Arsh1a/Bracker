import express from "express";
const router = express.Router();

import {
  getAllInvites,
  getUserInfo,
  handleInvite,
  login,
  logout,
  register,
} from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(authMiddleware, logout);
router.route("/user").get(authMiddleware, getUserInfo);

router.route("/invites").get(authMiddleware, getAllInvites);
router.route("/invites/:inviteID").post(authMiddleware, handleInvite);

export default router;
