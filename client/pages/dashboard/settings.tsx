import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GetServerSideProps } from "next";
import { getSession } from "../../lib/requestApi";
import DashboardPagesLayout from "../../components/Common/DashboardPagesLayout";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";
import ProfilePicture from "../../components/Common/ProfilePicture";
import Input from "../../components/Common/Input";
import Button from "../../components/Common/Button";
import { useAppDispatch } from "../../lib/hooks";
import { reset, updateUserInfo, uploadPicture } from "../../features/slices/auth/authSlice";
import ErrorMessage from "../../components/Common/ErrorMessage";
import ContentWrapper from "../../components/Common/ContentWrapper";
import { MdModeEdit } from "react-icons/md";
import EditProfile from "../../components/Dashboard/Setting/EditProfile";
import ChangePassword from "../../components/Dashboard/Setting/ChangePassword";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
  justify-content: space-between;
  @media screen and (max-width: 1100px) {
    flex-direction: column;
  }
`;

const StyledErrorMessage = styled(ErrorMessage)`
  margin-bottom: 20px;
`;

interface Props {}

const Settings = ({}: Props) => {
  const { user, isLoading, isError, message, isSuccess } = useSelector(
    (state: RootState) => state.auth
  );

  const childrenProps = {
    user,
    isLoading,
    isError,
    message,
    isSuccess,
  };

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
  }, [isSuccess]);

  return (
    <DashboardPagesLayout headerContent={<h1>Profile Settings</h1>}>
      {isError && message && <StyledErrorMessage>{message}</StyledErrorMessage>}
      <Wrapper>
        <EditProfile {...childrenProps} />
        <ChangePassword {...childrenProps} />
      </Wrapper>
      <ToastContainer />
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
