import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import ErrorResponse from "../utils/errorResponse";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.cookies.access_token) {
    try {
      //Get token from header
      token = req.cookies.access_token;
      //Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      //Get user from token
      (<any>req).user = await User.findById((<any>decoded).id).select("-password");

      next();
    } catch (error) {
      next(new ErrorResponse("Not authorized", 403));
    }
  }
  if (!token) {
    next(new ErrorResponse("Not authorized", 403));
  }
};

export default authMiddleware;
