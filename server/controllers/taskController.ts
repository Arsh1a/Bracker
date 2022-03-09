import { NextFunction, Request, Response } from "express";
import Task from "../models/taskModel";
import Project from "../models/projectModel";
import ErrorResponse from "../utils/errorResponse";
import { isValidObjectId } from "mongoose";

// @desc Get tasks for a project
// @route GET /api/task/
// @access private
export const getTasksForProject = async (req: Request, res: Response, next: NextFunction) => {
  const { projectID } = req.body;
  const { user } = <any>req;

  //Checks if provided project id can be casted ot ObjectId
  if (!isValidObjectId(projectID)) {
    return next(new ErrorResponse("Invalid project ID", 400));
  }

  //Check if project exist
  const project = await Project.findById(projectID);
  if (!project) {
    return next(new ErrorResponse("Project not found", 404));
  }

  //Check if user is the owner of the project
  if (project.createdBy.toString() !== user._id.toString()) {
    return next(new ErrorResponse("There was an error", 403));
  }

  try {
    const tasks = await Task.find({ projectID });
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

// @desc Create new task
// @route POST /api/task/
// @access private
export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  const { title, desc, projectID } = req.body;
  const { user } = <any>req;

  //Checks if provided project id can be casted ot ObjectId
  if (!isValidObjectId(projectID)) {
    return next(new ErrorResponse("Invalid project ID", 400));
  }

  //Checks if provided project id exists in database
  const project = await Project.findById(projectID);
  if (!project) {
    return next(new ErrorResponse("Project does not exist", 404));
  }

  try {
    const task = await Task.create({
      title: title,
      desc: desc,
      createdBy: user._id,
      projectID,
    });

    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

/// @desc Update task
/// @route PUT /api/task/:id
/// @access private
export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  const { title, desc } = req.body;
  const { id } = req.params;
  const { user } = <any>req;

  console.log(id);

  //Checks if provided project id can be casted ot ObjectId
  if (!isValidObjectId(id)) {
    return next(new ErrorResponse("Invalid project ID", 400));
  }

  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, createdBy: user._id },
      {
        title: title,
        desc: desc,
      },
      { new: true }
    );

    if (!task) {
      return next(new ErrorResponse("Project not found", 404));
    }

    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

// @desc Delete task
// @route DELETE /api/task/:id
// @access private
export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { user } = <any>req;

  //Checks if provided task id can be casted ot ObjectId
  if (!isValidObjectId(id)) {
    return next(new ErrorResponse("Invalid task ID", 400));
  }

  try {
    const task = await Task.findOneAndDelete({ _id: id, createdBy: user._id });

    //Checks if provided task id exists in database
    if (!task) {
      return next(new ErrorResponse("Task does not exist", 404));
    }

    res.status(200).json(task + " deleted");
  } catch (err) {
    next(err);
  }
};
