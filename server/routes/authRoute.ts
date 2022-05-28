import express from "express";
const router = express.Router();

import {
  getAllInvites,
  getUserInfo,
  getUserInfoById,
  handleInvite,
  login,
  logout,
  register,
  searchUsers,
} from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(authMiddleware, logout);
router.route("/user").get(authMiddleware, getUserInfo);
router.route("/user/search").get(authMiddleware, searchUsers);
router.route("/user/:userID").get(authMiddleware, getUserInfoById);

router.route("/invite").get(authMiddleware, getAllInvites);
router.route("/invite/:inviteID").post(authMiddleware, handleInvite);

export default router;
