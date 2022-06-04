import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import styled from "styled-components";
import DashboardPagesLayout from "../../../components/Common/DashboardPagesLayout";
import { getProjectSession } from "../../../lib/requestApi";
import ProfilePicture from "../../../components/Common/ProfilePicture";
import { useSelector } from "react-redux";
import { RootState } from "../../../features/store";

const Wrapper = styled.div``;

interface Props {}

const Settings = ({}: Props) => {
  return (
    <DashboardPagesLayout headerContent={<h1>Project Settings</h1>}>Soon</DashboardPagesLayout>
  );
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
