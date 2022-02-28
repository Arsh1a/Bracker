import { NextFunction, Request, Response } from "express";
import Project from "../models/projectModel";
import ErrorResponse from "../utils/errorResponse";

// @desc Create new project
// @route POST /auth/reguister
// @access Public
export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  const project = await Project.create({ title: req.body.title, desc: req.body.desc });
};

export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {};
