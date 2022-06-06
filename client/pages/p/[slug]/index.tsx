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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ProjectSubject = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ProjectInfo = styled(ContentWrapper)`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  gap: 40px;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  display: flex;
  align-items: center;
`;

const ProjectInfoText = styled.div`
  flex: 1 1 150px;
  display: flex;
  gap: 10px;
  p {
    font-weight: 800;
  }
  svg {
    font-size: 2rem;
    margin-top: 5px;
  }
  div {
    display: flex;
    flex-direction: column;
  }
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
        <ProjectInfo>
          <ProjectInfoText>
            <BsPerson />
            <div>
              <h1>{members.length}</h1>
              <p>Members</p>
            </div>
          </ProjectInfoText>
          <ProjectInfoText>
            <BsListUl />
            <div>
              <h1>{ticketStats.totalTickets}</h1>
              <p>Total tickets</p>
            </div>
          </ProjectInfoText>
          <ProjectInfoText>
            <BsCheck2Circle />
            <div>
              <h1>{ticketStats.openTickets}</h1>
              <p>Open tickets</p>
            </div>
          </ProjectInfoText>
          <ProjectInfoText>
            <BsXCircle />
            <div>
              <h1>{ticketStats.closedTickets}</h1>
              <p>Closed tickets</p>
            </div>
          </ProjectInfoText>
        </ProjectInfo>
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
