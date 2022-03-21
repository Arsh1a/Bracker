import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import ErrorResponse from "../utils/errorResponse";

// @desc Register new user
// @route POST /auth/register
// @access Public
export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    if (user) {
      return res
        .cookie("access_token", user.getSignedToken(), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({ username: user.username, email: user.email });
    }
  } catch (err) {
    next(err);
  }
};

// @desc Authenticate a user
// @route POST /api/auth/login
// @access Public
export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email && !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  } else if (!password) {
    return next(new ErrorResponse("Please provide a password", 400));
  } else if (!email) {
    return next(new ErrorResponse("Please provide an email", 400));
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

    if (user) {
      return res
        .cookie("access_token", user.getSignedToken(), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({ username: user.username, email: user.email });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};
