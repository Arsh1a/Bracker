import React from "react";
import styled from "styled-components";
import { GetServerSideProps } from "next";
import axios from "axios";
import { fetchProjects } from "../../lib/requestApi";
import ProjectsList from "../../components/Dashboard/Projects/ProjectsList";
import Container from "../../components/Common/Container";

const Wrapper = styled.div``;

interface Props {
  data: any[];
}

const Projects = ({ data }: Props) => {
  console.log(data);
  return (
    <Container>
      <ProjectsList data={data} />
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
