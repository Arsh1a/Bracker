import { NextFunction, Request, Response } from "express";
import Project from "../models/projectModel";
import Task from "../models/taskModel";
import ErrorResponse from "../utils/errorResponse";
import { isValidObjectId } from "mongoose";

// @desc Get all projects
// @route GET /api/project
// @access private
export const getAllProjects = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = <any>req;

  try {
    const projects = await Project.find({ createdBy: user._id });
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
      createdBy: user._id,
    });

    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
};

/// @desc Update project
/// @route PUT /api/project/:id
/// @access private
export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  const { title, desc } = req.body;
  const { id } = req.params;
  const { user } = <any>req;

  console.log(id);

  //Checks if provided project id can be casted ot ObjectId
  if (!isValidObjectId(id)) {
    return next(new ErrorResponse("Invalid project ID", 400));
  }

  try {
    const project = await Project.findOneAndUpdate(
      { _id: id, createdBy: user._id },
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
// @route DELETE /api/project/:id
// @access private
export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { user } = <any>req;

  //Checks if provided project id can be casted ot ObjectId
  if (!isValidObjectId(id)) {
    return next(new ErrorResponse("Invalid project ID", 400));
  }

  try {
    const project = await Project.findOneAndDelete({ _id: id, createdBy: user._id });

    //Checks if provided project id exists in database
    if (!project) {
      return next(new ErrorResponse("Project does not exist", 404));
    }

    //Delete project tasks
    await Task.deleteMany({ id });

    res.status(200).json(project + " deleted");
  } catch (err) {
    next(err);
  }
};
