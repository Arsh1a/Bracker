import { NextFunction, Request, Response } from "express";
import Task from "../models/taskModel";
import Project from "../models/projectModel";
import ErrorResponse from "../utils/errorResponse";
import { isValidObjectId } from "mongoose";

// @desc Get tasks for a project
// @route GET /api/projects/:projectID/tasks
// @access private
export const getTasksForProject = async (req: Request, res: Response, next: NextFunction) => {
  const { projectID } = req.params;
  const { user } = <any>req;

  //Checks if provided project id can be casted ot ObjectId
  if (!isValidObjectId(projectID)) {
    return next(new ErrorResponse("Invalid project ID", 400));
  }

  //Checks if provided project id exists in database and the user is part of the project
  const project = await Project.findById(projectID).or([
    { owner: user._id },
    { members: user._id },
  ]);
  if (!project) {
    return next(new ErrorResponse("There was an error fetching tasks", 400));
  }

  try {
    const tasks = await Task.find({ projectID });
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

// @desc Create new task
// @route POST /api/projects/:projectID/tasks
// @access private
export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  const { title, desc, severity, status, content, assignee } = req.body;
  const { projectID } = req.params;
  const { user } = <any>req;

  //Checks if provided project id can be casted ot ObjectId
  if (!isValidObjectId(projectID)) {
    return next(new ErrorResponse("Invalid project ID", 400));
  }

  //Checks if provided project id exists in database and the user is part of the project
  const project = await Project.findById(projectID).or([
    { owner: user._id },
    { members: user._id },
  ]);
  if (!project) {
    return next(new ErrorResponse("There was an error creating the task", 400));
  }

  try {
    const task = await Task.create({
      title,
      desc,
      severity,
      status,
      content,
      assignee,
      reporter: user._id,
      projectID,
    });

    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

/// @desc Update task
/// @route PATCH /api/projects/:projectID/tasks/:taskID
/// @access private
export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  const { title, desc, severity, status, content, assignee } = req.body;
  const { projectID, taskID } = req.params;
  const { user } = <any>req;

  //Checks if provided project id can be casted ot ObjectId
  if (!isValidObjectId(projectID)) {
    return next(new ErrorResponse("Invalid project ID", 400));
  }

  //Checks if provided task id can be casted ot ObjectId
  if (!isValidObjectId(taskID)) {
    return next(new ErrorResponse("Invalid task ID", 400));
  }

  //Checks if provided project id exists in database and the user is part of the project
  const project = await Project.findById(projectID).or([
    { owner: user._id },
    { members: user._id },
  ]);

  if (!project) {
    return next(new ErrorResponse("There was an error updating the task", 400));
  }

  try {
    const task = await Task.findOneAndUpdate(
      { _id: taskID, projectID },
      {
        title,
        desc,
        severity,
        status,
        content,
        assignee,
      },
      { new: true, runValidators: true }
    );

    if (!task) {
      return next(new ErrorResponse("There was an error updating the task", 404));
    }

    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

// @desc Delete task
// @route DELETE /api/projects/:projectID/tasks/:taskID
// @access private
export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  const { projectID, taskID } = req.params;
  const { user } = <any>req;

  //Checks if provided task id can be casted to ObjectId
  if (!isValidObjectId(projectID)) {
    return next(new ErrorResponse("Invalid project ID", 400));
  }

  //Checks if provided task id can be casted to ObjectId
  if (!isValidObjectId(taskID)) {
    return next(new ErrorResponse("Invalid task ID", 400));
  }

  //Checks if provided project id exists in database and the user is part of the project
  const project = await Project.findById(projectID).or([
    { owner: user._id },
    { members: user._id },
  ]);

  if (!project) {
    return next(new ErrorResponse("There was an error deleting the task", 400));
  }

  try {
    const task = await Task.findOneAndDelete({ _id: taskID, projectID });

    //Checks if provided task id exists in database
    if (!task) {
      return next(new ErrorResponse("Task does not exist", 404));
    }

    res.status(200).json(task + " deleted");
  } catch (err) {
    next(err);
  }
};
