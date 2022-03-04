import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    desc: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "There is no owner"],
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

export default mongoose.model("Task", taskSchema);
