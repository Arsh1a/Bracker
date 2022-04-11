import React from "react";
import styled from "styled-components";
import { GetServerSideProps } from "next";
import axios from "axios";

const Wrapper = styled.div``;

interface Props {}

const Settings = ({}: Props) => {
  return <Wrapper></Wrapper>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  //Check if any cookie exists
  if (context.req.headers.cookie) {
    //Get user info
    const response = await axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/auth/user", {
        withCredentials: true,
        headers: {
          Cookie: context.req.headers.cookie,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });

    //Check if response is OK
    if (response.status === 200) {
      return {
        props: {
          userInfo: response.data,
        },
      };
    }
  }

  //Redirect to login page
  return {
    props: {
      userInfo: {},
      data: [],
    },
    redirect: {
      destination: "/",
    },
  };
};

export default Settings;
