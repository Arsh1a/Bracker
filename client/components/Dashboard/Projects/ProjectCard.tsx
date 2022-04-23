import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  width: 300px;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;
  background-color: white;
  border-radius: 12px;
  padding: 30px;
  border: 1px solid ${(props) => props.theme.colors.light};
`;

interface Props {
  title: string;
  description?: string;
}

const ProjectCard = ({ title, description }: Props) => {
  return (
    <Wrapper>
      <h3>{title}</h3>
      <p>{description}</p>
    </Wrapper>
  );
};
export default ProjectCard;
