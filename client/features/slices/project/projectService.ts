import axios from "axios";
import Cookies from "js-cookie";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/project/`;

//Register
const createProject = async (projectData: { title: string; desc?: string }) => {
  const response = await axios.post(API_URL, projectData, { withCredentials: true });
  return response.data;
};

const projectService = {
  createProject,
};

export default projectService;
