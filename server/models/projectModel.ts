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
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "There is no owner"],
      ref: "User",
    },
    otherUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
