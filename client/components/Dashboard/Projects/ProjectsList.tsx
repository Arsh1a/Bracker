import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  overflow-y: auto;
`;

interface Props {
  data: any[];
  setIsModalOpen: (isModalOpen: boolean) => void;
  isModalOpen: boolean;
}

const ProjectsList = ({ data, setIsModalOpen, isModalOpen }: Props) => {
  return (
    <Wrapper>
      {data &&
        data.map((project) => {
          return <ProjectCard key={project._id} title={project.title} description={project.desc} />;
        })}
      {isModalOpen && <ProjectModal setIsModalOpen={setIsModalOpen} />}
    </Wrapper>
  );
};
export default ProjectsList;
