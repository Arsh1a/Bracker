import axios from "axios";
import Cookies from "js-cookie";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/ticket/`;

const getTickets = async (projectID: string) => {
  const response = await axios.get(API_URL + projectID, { withCredentials: true });
  return response.data;
};

const countTickets = async (projectID: string) => {
  const response = await axios.get(API_URL + projectID + "/count", { withCredentials: true });
  return response.data;
};

const createTickets = async (ticketData: {
  projectID: string;
  title: string;
  desc?: string;
  severity: "Low" | "Medium" | "High";
  status: "Open" | "Closed" | "Inprogress";
  content: string;
  reporter: string;
  assignee?: string;
}) => {
  const response = await axios.post(API_URL + ticketData.projectID, ticketData, {
    withCredentials: true,
  });
  return response.data;
};

const updateTicket = async (ticketData: {
  ticketID: string;
  title?: string;
  desc?: string;
  severity?: "low" | "medium" | "high";
  status?: "open" | "closed" | "inprogress";
  content?: string;
  assignee?: string;
}) => {
  const response = await axios.patch(API_URL + ticketData.ticketID, ticketData, {
    withCredentials: true,
  });
  return response.data;
};

const deleteTicket = async (ticketID: string) => {
  const response = await axios.delete(API_URL + ticketID, { withCredentials: true });
  return response.data;
};

const ticketService = {
  getTickets,
  countTickets,
  createTickets,
  updateTicket,
  deleteTicket,
};

export default ticketService;
