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
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
