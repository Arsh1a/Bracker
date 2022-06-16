import express from "express";
const router = express.Router();

import { ping } from "../controllers/generalController";

router.route("/ping").get(ping);

export default router;
