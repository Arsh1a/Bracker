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
  const { name, username, email, password } = req.body;

  try {
    const user = await User.create({
      name,
      username,
      email,
      password,
    });

    if (user) {
      res.cookie(
        "user",
        `{"_id": "${user._id}", "name":"${user.name}", "username":"${user.username}", "email":"${user.email}"}`,
        {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
          sameSite: "none",
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
        }
      );
      res
        .cookie("access_token", user.getSignedToken(), {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
          sameSite: "none",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({ name: user.name, username: user.username, email: user.email, _id: user._id });
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
        `{"_id": "${user._id}", "name":"${user.name}", "username":"${user.username}", "email":"${user.email}"}`,
        {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
          sameSite: "none",
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
        }
      );
      res
        .cookie("access_token", user.getSignedToken(), {
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
          sameSite: "none",
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({ name: user.name, username: user.username, email: user.email, _id: user._id });
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
      name: loggedInUser.name,
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

/// @desc upload profile picture
/// @route POST /api/auth/user/picture
/// @access private
export const uploadPicture = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = <any>req;
  const { file } = req;

  if (!user) {
    return next(new ErrorResponse("Not authorized", 403));
  }

  if (!file) {
    return next(new ErrorResponse("No file uploaded", 400));
  }

  try {
    //Check if user already has a picture, if yes then update the picture instead of making new one.
    const foundUser = await User.findById(user._id);

    foundUser.profilePicture = file.filename;

    await foundUser.save();

    res.status(200).json({ success: true, message: "Picture uploaded" });
  } catch (err) {
    next(err);
  }
};

/// @desc get profile picture
/// @route GET /api/auth/picture/:userID
/// @access private

export const getPicture = async (req: Request, res: Response, next: NextFunction) => {
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

    if (!foundUser) {
      return next(new ErrorResponse("User not found", 404));
    }

    res = res.status(200).json(foundUser.profilePicture);
  } catch (err) {
    next(err);
  }
};

/// @desc Update user info
/// @route PATCH /api/auth/user/
/// @access private
export const updateUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = <any>req;
  const { email } = req.body;

  if (!user) {
    return next(new ErrorResponse("Not authorized", 403));
  }

  try {
    const foundUser = await User.findByIdAndUpdate(user._id, { email }, { new: true });

    if (!foundUser) {
      return next(new ErrorResponse("User not found", 404));
    }

    res.cookie(
      "user",
      `{"_id": "${user._id}", "name":"${user.name}", "username":"${user.username}", "email":"${user.email}"}`,
      {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        sameSite: "none",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
      }
    );

    res.status(200).json({
      _id: foundUser._id,
      name: foundUser.name,
      username: foundUser.username,
      email: foundUser.email,
    });
  } catch (err) {
    next(err);
  }
};

/// @desc Change password
/// @route PATCH /api/auth/user/password
/// @access private
export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = <any>req;
  const { currentPassword, newPassword } = req.body;

  if (!user) {
    return next(new ErrorResponse("Not authorized", 403));
  }

  try {
    const foundUser = await User.findById(user._id).select("+password");

    if (!foundUser) {
      return next(new ErrorResponse("User not found", 404));
    }

    const isMatch = await foundUser.matchPasswords(currentPassword);

    if (!isMatch) {
      return next(new ErrorResponse("Current Password is wrong", 404));
    }

    foundUser.password = newPassword;

    await foundUser.save();

    res.status(200).json({ success: true, message: "Password changed" });
  } catch (err) {
    next(err);
  }
};
