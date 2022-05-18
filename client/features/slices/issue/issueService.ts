import axios from "axios";
import Cookies from "js-cookie";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/issue/`;

const getIssues = async (projectID: string) => {
  const response = await axios.get(API_URL + projectID, { withCredentials: true });
  return response.data;
};

const countIssues = async (projectID: string) => {
  const response = await axios.get(API_URL + projectID + "/count", { withCredentials: true });
  return response.data;
};

const createIssues = async (issueData: {
  projectID: string;
  title: string;
  desc?: string;
  severity: "low" | "medium" | "high";
  status: "open" | "closed" | "inprogress";
  content: string;
  reporter: string;
  assignee?: string;
}) => {
  const response = await axios.post(API_URL + issueData.projectID, issueData, {
    withCredentials: true,
  });
  return response.data;
};

const updateIssue = async (issueData: {
  issueID: string;
  title?: string;
  desc?: string;
  severity?: "low" | "medium" | "high";
  status?: "open" | "closed" | "inprogress";
  content?: string;
  assignee?: string;
}) => {
  const response = await axios.patch(API_URL + issueData.issueID, issueData, {
    withCredentials: true,
  });
  return response.data;
};

const deleteIssue = async (issueID: string) => {
  const response = await axios.delete(API_URL + issueID, { withCredentials: true });
  return response.data;
};

const issueService = {
  getIssues,
  countIssues,
  createIssues,
  updateIssue,
  deleteIssue,
};

export default issueService;
