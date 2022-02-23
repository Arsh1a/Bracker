import express from "express";
const router = express.Router();

import { login, register } from "../controllers/authController";

router.route("/register").post(register);

router.route("/login").post(login);

export default router;
