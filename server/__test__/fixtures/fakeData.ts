import mongoose from "mongoose";
import Project from "../../models/projectModel";

const userOneId = new mongoose.Types.ObjectId();
export const userOne = {
  username: "FirstUserTesting",
  email: "FirstUserTesting@testing.com",
  password: "12345678",
};
