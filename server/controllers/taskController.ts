import { NextFunction, Request, Response } from "express";
import Task from "../models/taskModel";
import Project from "../models/projectModel";
import ErrorResponse from "../utils/errorResponse";
import { isValidObjectId } from "mongoose";

// @desc Create new task
// @route POST /task/
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

// @desc Delete project
// @route DELETE /project/
// @access private
export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  const { taskID } = req.body;

  //Checks if provided project id can be casted ot ObjectId
  if (!isValidObjectId(taskID)) {
    return next(new ErrorResponse("Invalid task ID", 400));
  }

  try {
    const task = await Task.findOneAndDelete({
      _id: taskID,
    });

    //Checks if provided task id exists in database
    if (!task) {
      return next(new ErrorResponse("Task does not exist", 404));
    }

    res.status(200).json(task + " deleted");
  } catch (err) {
    next(err);
  }
};
