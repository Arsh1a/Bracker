import { GetServerSideProps } from "next";
import React from "react";
import styled from "styled-components";
import { getProjectSession } from "../../../lib/requestApi";

const Wrapper = styled.div``;

interface Props {}

const MyTasks = ({}: Props) => {
  return <Wrapper></Wrapper>;
};
export default MyTasks;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getProjectSession(context);
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
