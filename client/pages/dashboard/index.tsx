import React from "react";
import styled from "styled-components";
import { GetServerSideProps } from "next";
import Container from "../../components/Common/Container";
import { fetchUserInfo } from "../../lib/requestApi";

const Wrapper = styled.div``;

interface Props {
  userInfo: { username: string; email: string };
}

const Profile = ({ userInfo }: Props) => {
  return <Container>s</Container>;
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
    },
    redirect: {
      destination: "/login",
    },
  };
};

export default Profile;
