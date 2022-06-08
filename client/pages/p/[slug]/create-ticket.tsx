import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import DashboardPagesLayout from "../../../components/Common/DashboardPagesLayout";
import Loading from "../../../components/Common/Loading";
const CreateTicketForm = dynamic(
  () => import("../../../components/Project/CreateTicket/CreateTicketForm"),
  {
    suspense: true,
  }
);
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
      <Suspense fallback={<Loading color="dark" />}>
        <CreateTicketForm projectData={data.project} />
      </Suspense>
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
