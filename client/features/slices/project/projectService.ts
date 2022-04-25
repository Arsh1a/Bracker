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

const updateProject = async (projectData: { id: string; title: string; desc?: string }) => {
  const response = await axios.patch(API_URL + projectData.id, projectData, {
    withCredentials: true,
  });
  return response.data;
};

const deleteProject = async (id: string) => {
  const response = await axios.delete(API_URL + id, { withCredentials: true });
  return response.data;
};

const inviteToProject = async (id: string, usersID: string[]) => {
  const response = await axios.patch(
    API_URL + id + "/users",
    { usersID },
    { withCredentials: true }
  );
  return response.data;
};

const projectService = {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  inviteToProject,
};

export default projectService;
