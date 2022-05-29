import { GetServerSideProps } from "next";
import React from "react";
import styled from "styled-components";
import Container from "../../../components/Common/Container";
import DashboardPagesLayout from "../../../components/Common/DashboardPagesLayout";
import TicketsTable from "../../../components/Project/TicketsTable";
import { getProjectSession } from "../../../lib/requestApi";

const Wrapper = styled.div`
  width: 100%;
`;

interface Props {
  data: any;
}

const TicketsPage = ({ data }: Props) => {
  const { _id } = data.project;
  return (
    <DashboardPagesLayout headerContent={<h1>Tickets</h1>}>
      <Wrapper>
        <TicketsTable projectID={_id} />
      </Wrapper>
    </DashboardPagesLayout>
  );
};
export default TicketsPage;

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
      data: session.data,
    },
  };
};
