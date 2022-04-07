import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

//Register
const register = async (userData: { name: string; email: string; password: string }) => {
  const response = await axios.post(API_URL + "register", userData, { withCredentials: true });

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//Login
const login = async (userData: { email: string; password: string }) => {
  const response = await axios.post(API_URL + "login", userData, { withCredentials: true });

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//Get User Info
const getUserInfo = async () => {
  const response = await axios.get(API_URL + "user", { withCredentials: true });

  if (!response.data) {
    return false;
  }

  return response.data;
};

//Logout
const logout = async () => {
  localStorage.removeItem("user");
  const response = await axios.get(API_URL + "logout", { withCredentials: true });

  return response.data;
};

const authService = {
  register,
  logout,
  login,
  getUserInfo,
};

export default authService;
