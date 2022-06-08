import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { BsPerson, BsListUl, BsCheck2Circle, BsXCircle } from "react-icons/bs";
import styled from "styled-components";
import Container from "../../../components/Common/Container";
import { getProjectSession } from "../../../lib/requestApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../features/store";
import { countTickets, reset } from "../../../features/slices/ticket/ticketSlice";
import TicketsTable from "../../../components/Project/TicketsTable";
import DashboardPagesLayout from "../../../components/Common/DashboardPagesLayout";
import { useAppDispatch } from "../../../lib/hooks";
import ContentWrapper from "../../../components/Common/ContentWrapper";
import { PieChart, Pie, Legend, Cell, Tooltip, ResponsiveContainer } from "recharts";
import ProjectInfo from "../../../components/Project/Home/ProjectInfo";
import dynamic from "next/dynamic";
const ProjectChart = dynamic(() => import("../../../components/Project/Home/ProjectChart"), {
  ssr: false,
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 35px;
`;

const ProjectSubject = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

interface Props {
  data: any;
}

const Project = ({ data }: Props) => {
  const { _id, title, desc, members } = data.project;

  const dispatch = useAppDispatch();
  const { isSuccess } = useSelector((state: RootState) => state.ticket);

  useEffect(() => {
    dispatch(countTickets(_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const { ticketStats, isLoading, isError, message } = useSelector(
    (state: RootState) => state.ticket
  );

  return (
    <DashboardPagesLayout
      headerContent={
        <ProjectSubject>
          <h1>{title}</h1>
          <p>{desc}</p>
        </ProjectSubject>
      }
    >
      <Wrapper>
        <ProjectInfo ticketStats={ticketStats} totalMembers={members.length} />
        <ProjectChart ticketStats={ticketStats} />
      </Wrapper>
    </DashboardPagesLayout>
  );
};
export default Project;

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
