import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../Common/Button";
import { AiOutlinePlus } from "react-icons/ai";
import ProjectCard from "./ProjectCard";
import Modal from "../../Common/Modal";
import Input from "../../Common/Input";
import Loading from "../../Common/Loading";
import ProjectModal from "./ProjectModal";

const Wrapper = styled.div``;

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

const ProjectsList = ({ data }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Wrapper>
      <Header>
        <h1>Projects</h1>
        <span onClick={() => setIsModalOpen(true)}>
          <AiOutlinePlus />
        </span>
      </Header>
      {data &&
        data.map((project) => {
          return <ProjectCard key={project._id} title={project.title} description={project.desc} />;
        })}
      {isModalOpen && <ProjectModal setIsModalOpen={setIsModalOpen} />}
    </Wrapper>
  );
};
export default ProjectsList;
