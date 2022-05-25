import { NextFunction, Request, Response } from "express";
import Ticket from "../models/ticketModel";
import Project from "../models/projectModel";
import ErrorResponse from "../utils/errorResponse";
import { isValidObjectId } from "mongoose";
import User from "../models/userModel";

// @desc Get tickets
// @route GET /api/ticket/:projectID
// @access private
export const getTickets = async (req: Request, res: Response, next: NextFunction) => {
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
    return next(new ErrorResponse("There was an error fetching tickets", 400));
  }

  try {
    //Magic
    const tickets = await Ticket.find({ projectID, ...filters })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      // -createdAt means descending order (newest first)
      .sort(`${orderToOperator}${sort}`);

    // count how many tickets are in the project
    const count = await Ticket.find({ projectID, ...filters }).countDocuments();

    res.status(200).json({
      tickets,
      totalTickets: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    next(err);
  }
};

// @desc Count tickets
// @route GET /api/ticket/:projectID/count
// @access private
export const countTickets = async (req: Request, res: Response, next: NextFunction) => {
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
    return next(new ErrorResponse("There was an error fetching tickets", 400));
  }

  try {
    const totalTickets = await Ticket.countDocuments({ projectID });
    const openTickets = await Ticket.countDocuments({ projectID, status: "open" });
    const inProgressTickets = await Ticket.countDocuments({ projectID, status: "inprogress" });
    const closedTickets = await Ticket.countDocuments({ projectID, status: "closed" });

    res.status(200).json({
      totalTickets,
      openTickets,
      inProgressTickets,
      closedTickets,
    });
  } catch (err) {
    next(err);
  }
};

// @desc Create new ticket
// @route POST /api/ticket/:projectID
// @access private
export const createTicket = async (req: Request, res: Response, next: NextFunction) => {
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
    return next(new ErrorResponse("There was an error creating the ticket", 400));
  }

  try {
    // If assignee is not provided, set it to the reporter (the user who created the ticket)
    const ticketAsignee = assignee ? assignee : user._id;

    const ticket = await Ticket.create({
      title,
      desc,
      severity,
      status,
      content,
      assignee: ticketAsignee,
      reporter: user._id,
      projectID,
    });

    res.status(200).json(ticket);
  } catch (err) {
    next(err);
  }
};

/// @desc Update ticket
/// @route PATCH /api/ticket/:ticketID
/// @access private
export const updateTicket = async (req: Request, res: Response, next: NextFunction) => {
  const { title, desc, severity, status, content, assignee } = req.body;
  const { ticketID } = req.params;
  const { user } = <any>req;

  //Checks if provided ticket id can be casted ot ObjectId
  if (!isValidObjectId(ticketID)) {
    return next(new ErrorResponse("Invalid ticket ID", 400));
  }

  try {
    const ticket = await Ticket.findOneAndUpdate(
      { _id: ticketID },
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

    if (!ticket) {
      return next(new ErrorResponse("There was an error updating the ticket", 404));
    }

    res.status(200).json(ticket);
  } catch (err) {
    next(err);
  }
};

// @desc Delete ticket
// @route DELETE /api/ticket/:ticketID
// @access private
export const deleteTicket = async (req: Request, res: Response, next: NextFunction) => {
  const { projectID, ticketID } = req.params;
  const { user } = <any>req;

  //Checks if provided ticket id can be casted to ObjectId
  if (!isValidObjectId(projectID)) {
    return next(new ErrorResponse("Invalid project ID", 400));
  }

  //Checks if provided ticket id can be casted to ObjectId
  if (!isValidObjectId(ticketID)) {
    return next(new ErrorResponse("Invalid ticket ID", 400));
  }

  //Checks if provided project id exists in database and the user is part of the project
  const project = await Project.findById(projectID).or([
    { owner: user._id },
    { members: user._id },
  ]);

  if (!project) {
    return next(new ErrorResponse("There was an error deleting the ticket", 400));
  }

  try {
    const ticket = await Ticket.findOneAndDelete({ _id: ticketID, projectID });

    //Checks if provided ticket id exists in database
    if (!ticket) {
      return next(new ErrorResponse("Ticket does not exist", 404));
    }

    res.status(200).json(ticket + " deleted");
  } catch (err) {
    next(err);
  }
};
