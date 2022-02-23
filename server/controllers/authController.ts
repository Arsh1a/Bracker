import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import ErrorResponse from "../utils/errorResponse";

const sendToken = (user: { getSignedToken: () => any }, statusCode: number, res: Response) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  try {
    console.log("Registering user...");
    const user = await User.create({
      username,
      email,
      password,
    });
    sendToken(user, 201, res);
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide email and password", 400));
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendToken(user, 200, res);
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};
