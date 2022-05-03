import { GetServerSideProps } from "next";
import React from "react";
import styled from "styled-components";
import { getSession, getTasks } from "../../lib/requestApi";

const Wrapper = styled.div``;

interface Props {}

const Project = ({}: Props) => {
  return <Wrapper></Wrapper>;
};
export default Project;

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
