import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import ProjectCard from "./ProjectCard";
import ProjectCreateModal from "./ProjectCreateModal";

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
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
          return (
            <ProjectCard
              id={project._id}
              key={project._id}
              title={project.title}
              description={project.desc}
            />
          );
        })}
      {isModalOpen && <ProjectCreateModal setIsModalOpen={setIsModalOpen} />}
    </Wrapper>
  );
};
export default ProjectsList;
