import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import ErrorResponse from "../utils/errorResponse";
import Project from "../models/projectModel";
import Invite from "../models/inviteModel";
import { isValidObjectId } from "mongoose";

// @desc Register new user
// @route POST /auth/register
// @access public
export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    if (user) {
      res.cookie(
        "user",
        `{"_id": "${user._id}", "username":"${user.username}", "email":"${user.email}"}`,
        {
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
        }
      );
      res
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
// @access public
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
      return next(new ErrorResponse("Invalid credentials", 404));
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 404));
    }

    if (user) {
      res.cookie(
        "user",
        `{"_id": "${user._id}", "username":"${user.username}", "email":"${user.email}"}`,
        {
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
        }
      );
      res
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

/// @desc Logout user
/// @route GET /api/auth/logout
/// @access private
export const logout = async (req: Request, res: Response, next: NextFunction) => {
  return res.clearCookie("access_token").status(200).json({ message: "Successfully logged out" });
};

///@desc Gets user information
///@route GET /api/auth/user
///@access private
export const getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = <any>req;

  if (!user) {
    return next(new ErrorResponse("Not authorized", 403));
  }

  try {
    const loggedInUser = await User.findById(user._id);
    res.status(200).json({
      username: loggedInUser.username,
      email: loggedInUser.email,
    });
  } catch (err) {
    next(err);
  }
};

///@desc Search users
///@route GET /api/auth/user/search
///@access private
export const searchUsers = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = <any>req;

  const { username } = req.query;

  if (!user) {
    return next(new ErrorResponse("Not authorized", 403));
  }

  if (!username) {
    return next(new ErrorResponse("Please provide a username", 400));
  }

  const regex = `^${username.toString()}`;

  try {
    const foundUser = await User.find({
      username: { $regex: regex },
    })
      .select("username")
      .limit(10);
    res.status(200).json(foundUser);
  } catch (err) {
    next(err);
  }
};

///@desc Get user info by id
///@route GET /api/auth/user/:userID
///@access private
export const getUserInfoById = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = <any>req;
  const { userID } = req.params;

  if (!user) {
    return next(new ErrorResponse("Not authorized", 403));
  }

  if (!isValidObjectId(userID)) {
    return next(new ErrorResponse("Invalid id", 400));
  }

  try {
    const foundUser = await User.findById(userID);
    res.status(200).json(foundUser);
  } catch (err) {
    next(err);
  }
};

/// @desc Handle Project Invites
/// @route GET /api/auth/invite
/// @access private
export const getAllInvites = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = <any>req;

  if (!user) {
    return next(new ErrorResponse("Not authorized", 403));
  }

  try {
    const invites = await Invite.find({ invitedUser: user._id });
    res.status(200).json(invites);
  } catch (err) {
    next(err);
  }
};

/// @desc Handle Project Invites
/// @route POST /api/auth/invite/:inviteID
/// @access private
export const handleInvite = async (req: Request, res: Response, next: NextFunction) => {
  const { accepted } = req.body;
  const { inviteID } = req.params;
  const { user } = <any>req;

  if (!user) {
    return next(new ErrorResponse("Not authorized", 403));
  }

  //Checks if provided invite id can be casted ot ObjectId
  if (!isValidObjectId(inviteID)) {
    return next(new ErrorResponse("Invalid invite ID", 400));
  }

  const invite = await Invite.findById(inviteID);

  if (!invite) {
    return next(new ErrorResponse("Invite not found", 404));
  }

  if (invite.invitedUser.toString() !== user._id.toString()) {
    return next(new ErrorResponse("You dont have any invites", 404));
  }

  try {
    if (accepted === true) {
      const project = await Project.findOneAndUpdate(
        { _id: invite.projectID },
        { $addToSet: { members: user._id } },
        { new: true }
      );

      if (!project) {
        return next(new ErrorResponse("There was an error adding the user", 400));
      }

      invite.remove();

      res.status(200).json({ inviteID, success: true });
    } else if (accepted === false) {
      invite.remove();

      res.status(200).json({ inviteID, success: true });
    } else {
      return next(new ErrorResponse("Invalid request", 400));
    }
  } catch (err) {
    next(err);
  }
};
