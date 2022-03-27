import mongoose from "mongoose";

const InviteSchema = new mongoose.Schema(
  {
    invitedUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "There is no invited user"],
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

const Task = mongoose.model("Invite", InviteSchema);

export default Task;
