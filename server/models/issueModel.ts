import mongoose from "mongoose";

const IssueSchema = new mongoose.Schema(
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
      enum: ["low", "medium", "high"],
      required: [true, "Please add a severity"],
    },
    status: {
      type: String,
      enum: ["open", "closed", "inprogress"],
      required: [true, "Please add a status"],
    },
    content: {
      type: String,
    },
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "There is no owner"],
      ref: "User",
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
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

const Issue = mongoose.model("Issue", IssueSchema);

export default Issue;
