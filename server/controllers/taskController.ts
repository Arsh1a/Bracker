import { NextFunction, Request, Response } from "express";
import Task from "../models/taskModel";
import Project from "../models/projectModel";
import ErrorResponse from "../utils/errorResponse";
import { isValidObjectId } from "mongoose";

// @desc Get tasks
// @route GET /api/project/:projectID/task
// @access private
export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  const { projectID } = req.params;
  const { user } = <any>req;
  // const { title, desc, severity, status, reporter, assignee } = req.query;
  const filters = req.query;

  // get page and limits from query
  // Default page=1 and limit=10
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 10;

  // get sorting and order from query
  // Default sort=createdAt and order=desc
  const sort = (req.query.sort as string) || "createdAt";
  const order = (req.query.order as string) || "desc";

  // Convert order to something that mongoose understands lol
  // Desc = - , Asc = +
  const orderToOperator = order === "desc" ? "-" : "+";

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
    //Magic
    const tasks = await Task.find({ projectID, ...filters })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      // -createdAt means descending order (newest first)
      .sort(`${orderToOperator}${sort}`);

    // count how many tasks are in the project
    const count = await Task.find({ projectID, ...filters }).countDocuments();

    res
      .status(200)
      .json({ tasks, totalTasks: count, totalPages: Math.ceil(count / limit), currentPage: page });
  } catch (err) {
    next(err);
  }
};

// @desc Create new task
// @route POST /api/project/:projectID/task
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
/// @route PATCH /api/project/:projectID/task/:taskID
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
// @route DELETE /api/project/:projectID/task/:taskID
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
