import React, { useEffect, useState } from "react";
import ProjectsList from "../../components/Dashboard/Projects/ProjectsList";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import { GetServerSideProps } from "next";
import { getSession } from "../../lib/requestApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { getProjects } from "../../features/slices/project/projectSlice";
import DashboardPagesLayout from "../../components/Dashboard/DashboardPagesLayout";
import ErrorMessage from "../../components/Common/ErrorMessage";

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

  const dispatch = useDispatch();
  const { projects, isLoading, isError, message } = useSelector(
    (state: RootState) => state.project
  );

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

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
      {isError && (
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
