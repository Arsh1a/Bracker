import React from "react";
import styled from "styled-components";
import { GetServerSideProps } from "next";
import axios from "axios";
import { fetchUserInfo } from "../../lib/requestApi";

const Wrapper = styled.div``;

interface Props {}

const Settings = ({}: Props) => {
  return <Wrapper></Wrapper>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  //Check if any cookie exists
  if (context.req.headers.cookie) {
    //Get user info
    const response = await fetchUserInfo(context);
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
      destination: "/login",
    },
  };
};

export default Settings;
