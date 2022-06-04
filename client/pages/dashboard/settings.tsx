import React from "react";
import styled from "styled-components";
import { GetServerSideProps } from "next";
import { getSession } from "../../lib/requestApi";
import DashboardPagesLayout from "../../components/Common/DashboardPagesLayout";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";
import ProfilePicture from "../../components/Common/ProfilePicture";

const Wrapper = styled.div``;

interface Props {}

const Settings = ({}: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <DashboardPagesLayout headerContent={<h1>Profile Settings</h1>}>
      <form
        action="http://localhost:5000/api/auth/picture"
        encType="multipart/form-data"
        method="POST"
      >
        <input type="file" id="image" name="image" />
        <input type="submit" />
      </form>
      <ProfilePicture userID={user?._id} />
    </DashboardPagesLayout>
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
