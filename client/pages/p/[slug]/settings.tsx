import { GetServerSideProps } from "next";
import React from "react";
import styled from "styled-components";
import DashboardPagesLayout from "../../../components/Common/DashboardPagesLayout";
import { getProjectSession } from "../../../lib/requestApi";

const Wrapper = styled.div``;

interface Props {}

const Settings = ({}: Props) => {
  return <DashboardPagesLayout headerContent={<h1>Settings</h1>}>Settings</DashboardPagesLayout>;
};
export default Settings;

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
