import express from "express";
const router = express.Router();

import {
  createTicket,
  deleteTicket,
  getTickets,
  updateTicket,
  countTickets,
} from "../controllers/ticketController";

import authMiddleware from "../middlewares/authMiddleware";

router.route("/:projectID").get(authMiddleware, getTickets).post(authMiddleware, createTicket);
router.route("/:projectID/count").get(authMiddleware, countTickets);
router.route("/:ticketID").patch(authMiddleware, updateTicket).delete(authMiddleware, deleteTicket);

export default router;
