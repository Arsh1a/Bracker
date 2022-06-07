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
  getPicture,
  uploadPicture,
  updateUserInfo,
  changePassword,
} from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";
import upload from "../utils/upload";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(authMiddleware, logout);
router.route("/user").get(authMiddleware, getUserInfo).patch(authMiddleware, updateUserInfo);
router.route("/user/password").patch(authMiddleware, changePassword);
router.route("/user/search").get(authMiddleware, searchUsers);
router.route("/user/:userID").get(authMiddleware, getUserInfoById);
router.route("/picture/:userID").get(authMiddleware, getPicture);
router.route("/picture").post(authMiddleware, upload.single("image"), uploadPicture);

router.route("/invite").get(authMiddleware, getAllInvites);
router.route("/invite/:inviteID").post(authMiddleware, handleInvite);

export default router;
