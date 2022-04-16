import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { fetchProjects } from "../../lib/requestApi";
import ProjectsList from "../../components/Dashboard/Projects/ProjectsList";
import Container from "../../components/Common/Container";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 50px;
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

interface Props {
  data: any[];
}

const Projects = ({ data }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Container>
      <InnerWrapper>
        <Header>
          <h1>Projects</h1>
          <span onClick={() => setIsModalOpen(true)}>
            <AiOutlinePlus />
          </span>
        </Header>
        <ProjectsList data={data} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
      </InnerWrapper>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  //Check if any cookie exists
  if (context.req.headers.cookie) {
    //Get user info
    const response = await fetchProjects(context);
    //Check if response is OK
    if (response.status === 200) {
      return {
        props: {
          data: response.data,
        },
      };
    }
  }

  //Redirect to login page
  return {
    props: {
      data: [],
    },
    redirect: {
      destination: "/login",
    },
  };
};

export default Projects;
