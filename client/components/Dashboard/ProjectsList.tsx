import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

interface Props {
  data: any[];
}

const ProjectsList = ({ data }: Props) => {
  return (
    <Wrapper>
      {data &&
        data.map((project) => {
          return <div key={project._id}>{project.title}</div>;
        })}
    </Wrapper>
  );
};
export default ProjectsList;
