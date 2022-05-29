import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  width: 400px;
  position: relative;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: rgb(10 19 23 / 5%) 0px 2px 8px 0px;
  justify-content: space-between;
  cursor: pointer;
  svg {
    position: relative;
    top: 2px;
    cursor: pointer;
    font-size: 1.2rem;
    transition: 0.3s;
    &:hover {
      opacity: 0.5;
    }
  }
  .delete {
    color: ${(props) => props.theme.colors.danger};
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

interface Props {
  id: string;
  title: string;
  description?: string;
}

const ProjectCard = ({ title, description, id }: Props) => {
  const router = useRouter();
  return (
    <Wrapper onClick={() => router.push(`/p/${id}`)}>
      <Info>
        <h3>{title}</h3>
        <p>{description}</p>
      </Info>
    </Wrapper>
  );
};
export default ProjectCard;
