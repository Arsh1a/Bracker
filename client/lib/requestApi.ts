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
      console.log(error);
      return null;
    });
};

export const getProjectSession = async (context: GetServerSidePropsContext) => {
  return axios
    .get(process.env.NEXT_PUBLIC_API_URL + "/project/" + context.params!.slug, {
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

export const searchUsers = async (username: string) => {
  return axios
    .get(process.env.NEXT_PUBLIC_API_URL + "/auth/user/search/?username=" + username, {
      withCredentials: true,
    })
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error));
};

export const getUserInfoById = async (userId: string) => {
  return axios
    .get(process.env.NEXT_PUBLIC_API_URL + "/auth/user/" + userId, {
      withCredentials: true,
    })
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error));
};

export const getProjectMembers = async (projectID: string) => {
  return axios
    .get(process.env.NEXT_PUBLIC_API_URL + "/project/" + projectID + "/users", {
      withCredentials: true,
    })
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error));
};

export const getTicketsForTable = async (
  projectID: string,
  page: number,
  limit: number,
  sort: string,
  order: string,
  status: "Open" | "Closed" | "Inprogress"
) => {
  return axios
    .get(
      process.env.NEXT_PUBLIC_API_URL +
        `/ticket/${projectID}?page=${page}&limit=${limit}&sort=${sort}&order=${order}&status=${status}`,
      {
        withCredentials: true,
      }
    )
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error));
};
