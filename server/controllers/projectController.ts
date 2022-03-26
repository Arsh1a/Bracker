import { NextFunction, Request, Response } from "express";
import Project from "../models/projectModel";
import Task from "../models/taskModel";
import User from "../models/userModel";
import ErrorResponse from "../utils/errorResponse";
import { isValidObjectId } from "mongoose";

// @desc Get all projects for a user
// @route GET /api/projects
// @access private
export const getAllProjects = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = <any>req;

  try {
    const projects = await Project.find({ owner: user._id });
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
};

// @desc Create new project
// @route POST /api/projects/
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
/// @route PATCH /api/projects/:projectID
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
      { new: true }
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
// @route DELETE /api/projects/:projectID
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

    res.status(200).json(project + " deleted");
  } catch (err) {
    next(err);
  }
};

/// @desc Add user to project
/// @route PUT /api/projects/:projectID/users/
/// @access private
export const addUserToProject = async (req: Request, res: Response, next: NextFunction) => {
  const { projectID } = req.params;
  const { userID } = req.body;
  const { user } = <any>req;

  //Checks if provided project id can be casted ot ObjectId
  if (!isValidObjectId(projectID)) {
    return next(new ErrorResponse("Invalid project ID", 400));
  }

  //Checks if provided user id can be casted ot ObjectId
  if (!isValidObjectId(userID)) {
    return next(new ErrorResponse("Invalid user ID", 400));
  }

  try {
    //Check if user exist in database
    const userExist = await User.findOne({ _id: userID });
    if (!userExist) {
      return next(new ErrorResponse("User not found", 404));
    }

    const previousProject = await Project.findOne({
      _id: projectID,
      owner: user._id,
    });

    //Checks if the user is the owner of the project
    if (previousProject.owner.toString() === userID) {
      return next(new ErrorResponse("This user is the owner of the project", 400));
    }

    const project = await Project.findOneAndUpdate(
      { _id: projectID, owner: user._id },
      { $addToSet: { otherUsers: userID } },
      { new: true }
    );

    //Checks if user already added to the project
    if (previousProject.otherUsers.toString() === project.otherUsers.toString()) {
      return next(new ErrorResponse("User is already added in the project", 400));
    }

    if (!project) {
      return next(new ErrorResponse("There was an error adding the user", 400));
    }

    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
};
