import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    desc: {
      type: String,
    },
    severity: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: [true, "Please add a severity"],
    },
    status: {
      type: String,
      enum: ["Open", "Closed", "Inprogress"],
      required: [true, "Please add a status"],
    },
    content: {
      type: String,
    },
    reporter: {
      type: {
        _id: mongoose.Schema.Types.ObjectId,
        username: String,
      },
      required: [true, "There is no owner"],
      ref: "User",
    },
    assignee: {
      type: {
        _id: mongoose.Schema.Types.ObjectId,
        username: String,
      },
      required: [true, "There is no assignees"],
      ref: "User",
    },
    projectID: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "There is no project assigned"],
      ref: "Project",
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", TicketSchema);

export default Ticket;
