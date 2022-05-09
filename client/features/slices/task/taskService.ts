import axios from "axios";
import Cookies from "js-cookie";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/task/`;

const getTasks = async (projectID: string) => {
  const response = await axios.get(API_URL + projectID, { withCredentials: true });
  return response.data;
};

const countTasks = async (projectID: string) => {
  const response = await axios.get(API_URL + projectID + "/count", { withCredentials: true });
  return response.data;
};

const createTasks = async (taskData: {
  projectID: string;
  title: string;
  desc?: string;
  severity: "low" | "medium" | "high";
  status: "open" | "closed" | "inprogress";
  content: string;
  reporter: string;
  assignee?: string;
}) => {
  const response = await axios.post(API_URL + taskData.projectID, taskData, {
    withCredentials: true,
  });
  return response.data;
};

const updateTask = async (taskData: {
  taskID: string;
  title?: string;
  desc?: string;
  severity?: "low" | "medium" | "high";
  status?: "open" | "closed" | "inprogress";
  content?: string;
  assignee?: string;
}) => {
  const response = await axios.patch(API_URL + taskData.taskID, taskData, {
    withCredentials: true,
  });
  return response.data;
};

const deleteTask = async (taskID: string) => {
  const response = await axios.delete(API_URL + taskID, { withCredentials: true });
  return response.data;
};

const taskService = {
  getTasks,
  countTasks,
  createTasks,
  updateTask,
  deleteTask,
};

export default taskService;
