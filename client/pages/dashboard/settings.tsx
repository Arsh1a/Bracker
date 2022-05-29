import React from "react";
import styled from "styled-components";
import { GetServerSideProps } from "next";
import { getSession } from "../../lib/requestApi";
import DashboardPagesLayout from "../../components/Common/DashboardPagesLayout";

const Wrapper = styled.div``;

interface Props {}

const Settings = ({}: Props) => {
  return (
    <DashboardPagesLayout headerContent={<h1>Settings</h1>}>Coming soon...</DashboardPagesLayout>
  );
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
