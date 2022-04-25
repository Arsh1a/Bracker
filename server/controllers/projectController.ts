import { NextFunction, Request, Response } from "express";
import Project from "../models/projectModel";
import Task from "../models/taskModel";
import User from "../models/userModel";
import Invite from "../models/inviteModel";
import ErrorResponse from "../utils/errorResponse";
import { isValidObjectId } from "mongoose";

// @desc Get all projects for a user
// @route GET /api/project/
// @access private
export const getAllProjects = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = <any>req;

  if (!user) {
    return next(new ErrorResponse("Not authorized", 403));
  }

  try {
    const projects = await Project.find().or([{ owner: user._id }, { members: user._id }]);
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
};

// @desc Create new project
// @route POST /api/project/
// @access private
export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  const { title, desc } = req.body;
  const { user } = <any>req;

  try {
    const project = await Project.create({
      title: title,
      desc: desc,
      owner: user._id,
    });

    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
};

/// @desc Update project
/// @route PATCH /api/project/:projectID
/// @access private
export const updateProjectInfo = async (req: Request, res: Response, next: NextFunction) => {
  const { title, desc } = req.body;
  const { projectID } = req.params;
  const { user } = <any>req;

  //Checks if provided project id can be casted ot ObjectId
  if (!isValidObjectId(projectID)) {
    return next(new ErrorResponse("Invalid project ID", 400));
  }

  try {
    const project = await Project.findOneAndUpdate(
      { _id: projectID, owner: user._id },
      {
        title: title,
        desc: desc,
      },
      { new: true, runValidators: true }
    );

    if (!project) {
      return next(new ErrorResponse("Project not found", 404));
    }

    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
};

// @desc Delete project
// @route DELETE /api/project/:projectID
// @access private
export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  const { projectID } = req.params;
  const { user } = <any>req;

  //Checks if provided project id can be casted ot ObjectId
  if (!isValidObjectId(projectID)) {
    return next(new ErrorResponse("Invalid project ID", 400));
  }

  try {
    const project = await Project.findOneAndDelete({ _id: projectID, owner: user._id });

    //Checks if provided project id exists in database
    if (!project) {
      return next(new ErrorResponse("Project does not exist", 404));
    }

    //Delete project tasks
    await Task.deleteMany({ id: projectID });

    res.status(200).json(projectID);
  } catch (err) {
    next(err);
  }
};

/// @desc Add user to project
/// @route PATCH /api/project/:projectID/users/
/// @access private
export const inviteToProject = async (req: Request, res: Response, next: NextFunction) => {
  const { projectID } = req.params;
  const { usersID } = req.body; //Array of user ids
  const { user } = <any>req;

  //Checks if provided project id can be casted ot ObjectId
  if (!isValidObjectId(projectID)) {
    return next(new ErrorResponse("Invalid project ID", 400));
  }

  try {
    // Loops through all user ids provided in request body
    for (let i = 0; i < usersID.length; i++) {
      if (!isValidObjectId(usersID[i])) {
        return next(new ErrorResponse("Invalid user ID", 400));
      }

      //Check if user exist in database
      const invitedUser = await User.findOne({ _id: usersID[i] });
      if (!invitedUser) {
        return next(new ErrorResponse("User does not exist", 404));
      }

      const projectBeforeInviting = await Project.findOne({
        _id: projectID,
        owner: user._id,
      });

      //Checks if the user is the owner of the project
      if (projectBeforeInviting.owner.toString() === usersID[i]) {
        return next(new ErrorResponse("You can't invite yourself", 400));
      }

      //Checks if the user already is in the project
      if (projectBeforeInviting.members.includes(usersID[i])) {
        return next(new ErrorResponse("User already in project", 400));
      }

      //Checks if the user is already invited to the project
      if (await Invite.findOne({ projectID: projectID, invitedUser: usersID[i] })) {
        return next(new ErrorResponse("User already invited", 400));
      }

      const invite = await Invite.create({
        invitedUser: usersID[i],
        projectID,
      });
    }

    res.status(200).json("Users has been invited");
  } catch (err) {
    next(err);
  }
};
