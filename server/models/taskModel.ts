import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
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
      required: [true, "Please add a content"],
    },
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "There is no owner"],
      ref: "User",
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
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

const Task = mongoose.model("Task", TaskSchema);

export default Task;
