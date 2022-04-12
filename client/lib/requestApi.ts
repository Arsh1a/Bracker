import axios from "axios";
import { GetServerSidePropsContext } from "next";

export const fetchUserInfo = async (context: GetServerSidePropsContext) => {
  return axios
    .get(process.env.NEXT_PUBLIC_API_URL + "/auth/user", {
      withCredentials: true,
      headers: {
        Cookie: context.req.headers.cookie!,
      },
    })
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error));
};

export const fetchProjects = async (context: GetServerSidePropsContext) => {
  return axios
    .get(process.env.NEXT_PUBLIC_API_URL + "/project", {
      withCredentials: true,
      headers: {
        Cookie: context.req.headers.cookie!,
      },
    })
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error));
};
