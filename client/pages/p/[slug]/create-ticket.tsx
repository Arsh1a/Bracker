import { GetServerSideProps } from "next";
import React from "react";
import Container from "../../../components/Common/Container";
import DashboardPagesLayout from "../../../components/Common/DashboardPagesLayout";
import CreateTicketForm from "../../../components/Project/CreateTicket/CreateTicketForm";
import { getProjectSession } from "../../../lib/requestApi";

interface Props {
  data: {
    project: any;
    success: boolean;
  };
}

const MyTickets = ({ data }: Props) => {
  return (
    <DashboardPagesLayout headerContent={<h1>Create Ticket</h1>}>
      <CreateTicketForm projectData={data.project} />
    </DashboardPagesLayout>
  );
};
export default MyTickets;

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
