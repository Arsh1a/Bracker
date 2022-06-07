import React, { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ProjectsList = dynamic(() => import("../../components/Dashboard/Projects/ProjectsList"), {
  suspense: true,
});
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import { GetServerSideProps } from "next";
import { getSession } from "../../lib/requestApi";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { getProjects, reset } from "../../features/slices/project/projectSlice";
import DashboardPagesLayout from "../../components/Common/DashboardPagesLayout";
import ErrorMessage from "../../components/Common/ErrorMessage";
import { useAppDispatch } from "../../lib/hooks";

const Header = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.colors.primary};
    color: white;
    padding: 10px;
    border-radius: 100%;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const ErrorMessageWrapper = styled.div`
  margin-bottom: 20px;
`;
interface Props {}

const Projects = ({}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { projects, isLoading, isError, message, isSuccess } = useSelector(
    (state: RootState) => state.project
  );

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }
  }, [isSuccess]);

  return (
    <DashboardPagesLayout
      headerContent={
        <Header>
          <h1>Projects</h1>
          <span onClick={() => setIsModalOpen(true)}>
            <AiOutlinePlus />
          </span>
        </Header>
      }
    >
      {message && (
        <ErrorMessageWrapper>
          <ErrorMessage>{message}</ErrorMessage>
        </ErrorMessageWrapper>
      )}
      <ProjectsList data={projects} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
    </DashboardPagesLayout>
  );
};

//This is for SSR redirecting
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

export default Projects;
