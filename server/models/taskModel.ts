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
    projectID: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "There is no project"],
      ref: "Project",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
