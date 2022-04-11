import mongoose from "mongoose";
import Project from "../../models/projectModel";

export const userOneId = new mongoose.Types.ObjectId();
export const userOne = {
  _id: userOneId,
  username: "FirstUserTesting",
  email: "FirstUserTesting@testing.com",
  password: "12345678",
};

export const projectOneId = new mongoose.Types.ObjectId();

export const projectOne = {
  _id: projectOneId,
  title: "First Project",
  desc: "This is the first project",
};

export const updateProjectOne = {
  title: "Updated First Project",
  desc: "Updated This is the first project",
};

export const setupProject = async (projectData: Object, owner: any) => {
  await Project.deleteMany();
  await new Project(Object.assign(projectData, { owner })).save();
};
