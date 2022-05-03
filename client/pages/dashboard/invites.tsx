import React, { useEffect } from "react";
import styled from "styled-components";
import { GetServerSideProps } from "next";
import { getSession } from "../../lib/requestApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { getInvites } from "../../features/slices/invite/inviteSlice";
import DashboardPagesLayout from "../../components/Dashboard/DashboardPagesLayout";
import InvitesList from "../../components/Dashboard/Invites/InvitesList";
import ErrorMessage from "../../components/Common/ErrorMessage";

const ErrorMessageWrapper = styled.div`
  margin-bottom: 20px;
`;

interface Props {}

const Invites = ({}: Props) => {
  const dispatch = useDispatch();
  const { invites, isError, message } = useSelector((state: RootState) => state.invite);

  useEffect(() => {
    dispatch(getInvites());
  }, [dispatch]);

  console.log(invites);

  return (
    <DashboardPagesLayout headerContent={<h1>Invites</h1>}>
      {isError && (
        <ErrorMessageWrapper>
          <ErrorMessage>{message}</ErrorMessage>
        </ErrorMessageWrapper>
      )}
      <InvitesList data={invites!} />
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
