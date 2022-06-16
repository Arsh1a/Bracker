import { CookieOptions, NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import ErrorResponse from "../utils/errorResponse";
import Project from "../models/projectModel";
import Invite from "../models/inviteModel";
import { isValidObjectId } from "mongoose";

/// @desc Ping the server
/// @route GET /api/ping
/// @access public
export const ping = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ sucess: true });
};
