import { GetServerSideProps } from "next";
import React, { Suspense } from "react";
import styled from "styled-components";
import Container from "../../../components/Common/Container";
import dynamic from "next/dynamic";
import DashboardPagesLayout from "../../../components/Common/DashboardPagesLayout";
import { getProjectSession } from "../../../lib/requestApi";
const TicketsTable = dynamic(() => import("../../../components/Project/TicketsTable"), {
  suspense: true,
});

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
        <Suspense fallback={<p>Place Loading Skeleton Here</p>}>
          <TicketsTable projectID={_id} />
        </Suspense>
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
