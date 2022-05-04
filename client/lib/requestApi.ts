import axios from "axios";
import { GetServerSidePropsContext } from "next";

export const getSession = async (context: GetServerSidePropsContext) => {
  if (!context.req.headers.cookie || !context.req.headers.cookie.includes("access_token")) {
    return null;
  }

  return axios
    .get(process.env.NEXT_PUBLIC_API_URL + "/auth/user", {
      withCredentials: true,
      headers: {
        Cookie: context.req.headers.cookie,
      },
    })
    .then((response) => Promise.resolve(response))
    .catch((error) => {
      return null;
    });
};

export const searchUsers = async (username: string) => {
  return axios
    .get(process.env.NEXT_PUBLIC_API_URL + "/auth/user/search/?username=" + username, {
      withCredentials: true,
    })
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error));
};

export const getProjectSession = async (context: GetServerSidePropsContext) => {
  // I'm checking if user can fetch tasks from the project (probably there is a better way to check if user is authorized)
  return axios
    .get(process.env.NEXT_PUBLIC_API_URL + "/project/" + context.params!.slug + "/tasks", {
      withCredentials: true,
      headers: {
        Cookie: context.req.headers.cookie!,
      },
    })
    .then((response) => Promise.resolve(response))
    .catch((error) => {
      return null;
    });
};
