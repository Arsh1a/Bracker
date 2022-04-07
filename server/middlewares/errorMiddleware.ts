import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../utils/errorResponse";

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = { ...err };
  error.message = err.message;

  if (err.code === 11000) {
    const message = "That user already exists";
    error = new ErrorResponse(message, 400);
  }

  //Error messages from mongoose validation
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val: any) => val.message);
    error = new ErrorResponse(message[0], 400);
  }

  res.status(err.statusCode || error.statusCode || 500).json({
    success: false,
    message: error.message || "Server error",
  });
};

export default errorMiddleware;
