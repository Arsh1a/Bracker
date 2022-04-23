import axios from "axios";
import Cookies from "js-cookie";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/project/`;

const getProjects = async () => {
  const response = await axios.get(API_URL, { withCredentials: true });
  return response.data;
};

const createProject = async (projectData: { title: string; desc?: string; members?: any[] }) => {
  const response = await axios.post(API_URL, projectData, { withCredentials: true });
  return response.data;
};

const projectService = {
  createProject,
  getProjects,
};

export default projectService;
