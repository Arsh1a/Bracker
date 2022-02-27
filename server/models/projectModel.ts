import mongoose from "mongoose";
import taskModel from "./taskModel";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    desc: {
      type: String,
    },
    tasks: [taskModel],
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
