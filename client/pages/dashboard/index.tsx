import React from "react";
import styled from "styled-components";
import { GetServerSideProps } from "next";
import Container from "../../components/Common/Container";
import { getSession } from "../../lib/requestApi";

const Wrapper = styled.div``;

interface Props {
  userInfo: { username: string; email: string };
}

const Profile = ({ userInfo }: Props) => {
  return <Container>s</Container>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
};

export default Profile;
