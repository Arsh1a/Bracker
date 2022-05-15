import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { BsPerson, BsListUl, BsCheck2Circle, BsXCircle } from "react-icons/bs";
import styled from "styled-components";
import Container from "../../../components/Common/Container";
import { getProjectSession } from "../../../lib/requestApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../features/store";
import { countTasks, getTasks } from "../../../features/slices/task/taskSlice";
import Table from "../../../components/Table";
import axios from "axios";
import TasksTable from "../../../components/Project/TasksTable";

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

const ProjectInfo = styled.div`
  background-color: #f9f8f3;
  margin: 40px 0;
  padding: 40px;
  border-radius: 30px;
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
    font-weight: 500;
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

  const { taskStats, isLoading, isError, message } = useSelector((state: RootState) => state.task);
  return (
    <Container>
      <Wrapper>
        <ProjectSubject>
          <h1>{title}</h1>
          <p>{desc}</p>
        </ProjectSubject>
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
              <h1>{taskStats.totalTasks}</h1>
              <p>Total tasks</p>
            </div>
          </ProjectInfoText>
          <ProjectInfoText>
            <BsCheck2Circle />
            <div>
              <h1>{taskStats.openTasks}</h1>
              <p>Open tasks</p>
            </div>
          </ProjectInfoText>
          <ProjectInfoText>
            <BsXCircle />
            <div>
              <h1>{taskStats.closedTasks}</h1>
              <p>Closed tasks</p>
            </div>
          </ProjectInfoText>
        </ProjectInfo>
        <TasksTable projectID={_id} />
      </Wrapper>
    </Container>
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
