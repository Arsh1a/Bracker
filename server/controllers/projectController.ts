import { NextFunction, Request, Response } from "express";
import Project from "../models/projectModel";
import Task from "../models/taskModel";
import ErrorResponse from "../utils/errorResponse";
import { isValidObjectId } from "mongoose";

// @desc Create new project
// @route POST /project/
// @access private
export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  const { title, desc } = req.body;
  const { user } = <any>req;

  try {
    const project = await Project.create({
      title: title,
      desc: desc,
      createdBy: user._id,
    });

    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
};

// @desc Delete project
// @route DELETE /project/
// @access private
export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  const { projectID } = req.body;

  //Checks if provided project id can be casted ot ObjectId
  if (!isValidObjectId(projectID)) {
    return next(new ErrorResponse("Invalid project ID", 400));
  }

  try {
    const project = await Project.findOneAndDelete({
      _id: projectID,
    });

    //Checks if provided project id exists in database
    if (!project) {
      return next(new ErrorResponse("Project does not exist", 404));
    }

    //Delete project tasks
    await Task.deleteMany({ projectID: projectID });

    res.status(200).json(project + " deleted");
  } catch (err) {
    next(err);
  }
};
