import { NextFunction, Request, Response } from "express";
import Project from "../models/projectModel";
import ErrorResponse from "../utils/errorResponse";

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
export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {};
