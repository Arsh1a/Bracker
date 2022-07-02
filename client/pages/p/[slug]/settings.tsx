import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import DashboardPagesLayout from "../../../components/Common/DashboardPagesLayout";
import { getProjectSession } from "../../../lib/requestApi";
import EditProjectDetails from "../../../components/Project/Settings/EditProjectDetails";
import DeleteProject from "../../../components/Project/Settings/DeleteProject";
import styled from "styled-components";
import InviteMemberToProject from "../../../components/Project/Settings/InviteMemberToProject";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../features/store";
import ErrorMessage from "../../../components/Common/ErrorMessage";
import "react-toastify/dist/ReactToastify.css";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const FirstRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex: 1;
  gap: 20px;
  width: 100%;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const StyledErrorMessage = styled(ErrorMessage)`
  margin-bottom: 20px;
`;

interface Props {
  data: any;
}

const Settings = ({ data }: Props) => {
  const { isSuccess, isError, message } = useSelector((state: RootState) => state.project);

  const notify = () =>
    toast("Operation was succesful.", {
      type: "success",
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  useEffect(() => {
    if (isSuccess) {
      notify();
    }
  });

  return (
    <DashboardPagesLayout headerContent={<h1>Project Settings</h1>}>
      {isError && message && <StyledErrorMessage>{message}</StyledErrorMessage>}
      <Wrapper>
        <EditProjectDetails data={data} />
        <FirstRow>
          <InviteMemberToProject data={data} />
          <DeleteProject data={data} />
        </FirstRow>
      </Wrapper>
      <ToastContainer />
    </DashboardPagesLayout>
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
    props: {
      data: session.data.project,
    },
  };
};
