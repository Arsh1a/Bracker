import React, { useEffect } from "react";
import styled from "styled-components";
import { GetServerSideProps } from "next";
import { getSession } from "../../lib/requestApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { getInvites } from "../../features/slices/invite/inviteSlice";
import DashboardPagesLayout from "../../components/Common/DashboardPagesLayout";
import InvitesList from "../../components/Dashboard/Invites/InvitesList";
import ErrorMessage from "../../components/Common/ErrorMessage";
import { useAppDispatch } from "../../lib/hooks";

const ErrorMessageWrapper = styled.div`
  margin-bottom: 20px;
`;

interface Props {}

const Invites = ({}: Props) => {
  const dispatch = useAppDispatch();
  const { invites, isError, message } = useSelector((state: RootState) => state.invite);

  useEffect(() => {
    dispatch(getInvites());
  }, [dispatch]);

  return (
    <DashboardPagesLayout headerContent={<h1>Invites</h1>}>
      {isError && (
        <ErrorMessageWrapper>
          <ErrorMessage>{message}</ErrorMessage>
        </ErrorMessageWrapper>
      )}
      {invites.length > 0 ? (
        <InvitesList data={invites} />
      ) : (
        <h3>Seems like no one wants you in their project. 😔</h3>
      )}
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

export default Invites;
