import React, { useEffect, useState } from "react";
import ProjectsList from "../../components/Dashboard/Projects/ProjectsList";
import Container from "../../components/Common/Container";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import { GetServerSideProps } from "next";
import { fetchUserInfo } from "../../lib/requestApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { getProjects } from "../../features/slices/project/projectSlice";

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
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
    <Container>
      <InnerWrapper>
        <Header>
          <h1>Projects</h1>
          <span onClick={() => setIsModalOpen(true)}>
            <AiOutlinePlus />
          </span>
        </Header>
        {isError && <h3>{message}</h3>}
        <ProjectsList data={projects} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
      </InnerWrapper>
    </Container>
  );
};

//This is for SSR redirecting
export const getServerSideProps: GetServerSideProps = async (context) => {
  //Check if any cookie exists
  if (context.req.headers.cookie) {
    //Get user info
    const response = await fetchUserInfo(context);
    //Check if response is OK
    if (response.status === 200) {
      return {
        props: {},
      };
    }
  }

  //Redirect to login page
  return {
    props: {
      userInfo: {},
    },
    redirect: {
      destination: "/login",
    },
  };
};

export default Projects;
