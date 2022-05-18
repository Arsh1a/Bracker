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
    invitedByUsername: {
      type: String,
      required: [true, "There is no invited by user"],
    },
    projectName: {
      type: String,
      required: [true, "There is no project name"],
    },
  },
  { timestamps: true }
);

const Invite = mongoose.model("Invite", InviteSchema);

export default Invite;
