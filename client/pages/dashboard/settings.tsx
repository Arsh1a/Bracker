import React from "react";
import styled from "styled-components";
import { GetServerSideProps } from "next";
import axios from "axios";
import { getSession } from "../../lib/requestApi";

const Wrapper = styled.div``;

interface Props {}

const Settings = ({}: Props) => {
  return <Wrapper></Wrapper>;
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

export default Settings;
