import axios from "axios";
import Cookies from "js-cookie";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/`;

//Register
const register = async (userData: { username: string; email: string; password: string }) => {
  const response = await axios.post(API_URL + "register", userData, { withCredentials: true });
  return response.data;
};

//Login
const login = async (userData: { email: string; password: string }) => {
  const response = await axios.post(API_URL + "login", userData, { withCredentials: true });
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

//Update User Info
const updateUserInfo = async (userData: { email: string }) => {
  const response = await axios.patch(API_URL + "user", userData, { withCredentials: true });
  return response.data;
};

const uploadPicture = async (picture: File) => {
  const formData = new FormData();
  formData.append("image", picture);
  const response = await axios.post(API_URL + "picture", formData, { withCredentials: true });
  return response.data;
};

const changePassword = async (userData: { currentPassword: string; newPassword: string }) => {
  const response = await axios.patch(API_URL + "user/password", userData, {
    withCredentials: true,
  });
  return response.data;
};

//Logout
const logout = async () => {
  //Remove cookie from client and server
  Cookies.remove("user");
  const response = await axios.get(API_URL + "logout", { withCredentials: true });

  return response.data;
};

const authService = {
  register,
  logout,
  login,
  getUserInfo,
  updateUserInfo,
  uploadPicture,
  changePassword,
};

export default authService;
