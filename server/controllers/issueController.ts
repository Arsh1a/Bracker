import { NextFunction, Request, Response } from "express";
import Issue from "../models/issueModel";
import Project from "../models/projectModel";
import ErrorResponse from "../utils/errorResponse";
import { isValidObjectId } from "mongoose";
import User from "../models/userModel";

// @desc Get issues
// @route GET /api/issue/:projectID
// @access private
export const getIssues = async (req: Request, res: Response, next: NextFunction) => {
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
  // Desc = - , Asc = blank
  const orderToOperator = order === "desc" ? "-" : "";

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
    return next(new ErrorResponse("There was an error fetching issues", 400));
  }

  try {
    //Magic
    const issues = await Issue.find({ projectID, ...filters })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      // -createdAt means descending order (newest first)
      .sort(`${orderToOperator}${sort}`);

    // count how many issues are in the project
    const count = await Issue.find({ projectID, ...filters }).countDocuments();

    res.status(200).json({
      issues,
      totalIssues: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    next(err);
  }
};

// @desc Count issues
// @route GET /api/issue/:projectID/count
// @access private
export const countIssues = async (req: Request, res: Response, next: NextFunction) => {
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
    return next(new ErrorResponse("There was an error fetching issues", 400));
  }

  try {
    const totalIssues = await Issue.countDocuments({ projectID });
    const openIssues = await Issue.countDocuments({ projectID, status: "open" });
    const inProgressIssues = await Issue.countDocuments({ projectID, status: "inprogress" });
    const closedIssues = await Issue.countDocuments({ projectID, status: "closed" });

    res.status(200).json({
      totalIssues,
      openIssues,
      inProgressIssues,
      closedIssues,
    });
  } catch (err) {
    next(err);
  }
};

// @desc Create new issue
// @route POST /api/issue/:projectID
// @access private
export const createIssue = async (req: Request, res: Response, next: NextFunction) => {
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
    return next(new ErrorResponse("There was an error creating the issue", 400));
  }

  try {
    // If assignee is not provided, set it to the reporter (the user who created the issue)
    const issueAsignee = assignee ? assignee : user._id;

    const issue = await Issue.create({
      title,
      desc,
      severity,
      status,
      content,
      assignee: issueAsignee,
      reporter: user._id,
      projectID,
    });

    res.status(200).json(issue);
  } catch (err) {
    next(err);
  }
};

/// @desc Update issue
/// @route PATCH /api/issue/:issueID
/// @access private
export const updateIssue = async (req: Request, res: Response, next: NextFunction) => {
  const { title, desc, severity, status, content, assignee } = req.body;
  const { projectID, issueID } = req.params;
  const { user } = <any>req;

  //Checks if provided project id can be casted ot ObjectId
  if (!isValidObjectId(projectID)) {
    return next(new ErrorResponse("Invalid project ID", 400));
  }

  //Checks if provided issue id can be casted ot ObjectId
  if (!isValidObjectId(issueID)) {
    return next(new ErrorResponse("Invalid issue ID", 400));
  }

  //Checks if provided project id exists in database and the user is part of the project
  const project = await Project.findById(projectID).or([
    { owner: user._id },
    { members: user._id },
  ]);

  if (!project) {
    return next(new ErrorResponse("There was an error updating the issue", 400));
  }

  try {
    const issue = await Issue.findOneAndUpdate(
      { _id: issueID, projectID },
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

    if (!issue) {
      return next(new ErrorResponse("There was an error updating the issue", 404));
    }

    res.status(200).json(issue);
  } catch (err) {
    next(err);
  }
};

// @desc Delete issue
// @route DELETE /api/issue/:issueID
// @access private
export const deleteIssue = async (req: Request, res: Response, next: NextFunction) => {
  const { projectID, issueID } = req.params;
  const { user } = <any>req;

  //Checks if provided issue id can be casted to ObjectId
  if (!isValidObjectId(projectID)) {
    return next(new ErrorResponse("Invalid project ID", 400));
  }

  //Checks if provided issue id can be casted to ObjectId
  if (!isValidObjectId(issueID)) {
    return next(new ErrorResponse("Invalid issue ID", 400));
  }

  //Checks if provided project id exists in database and the user is part of the project
  const project = await Project.findById(projectID).or([
    { owner: user._id },
    { members: user._id },
  ]);

  if (!project) {
    return next(new ErrorResponse("There was an error deleting the issue", 400));
  }

  try {
    const issue = await Issue.findOneAndDelete({ _id: issueID, projectID });

    //Checks if provided issue id exists in database
    if (!issue) {
      return next(new ErrorResponse("Issue does not exist", 404));
    }

    res.status(200).json(issue + " deleted");
  } catch (err) {
    next(err);
  }
};
