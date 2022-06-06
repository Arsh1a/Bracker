import React from "react";
import styled from "styled-components";

/*Thanks to https://codepen.io/nzbin/pen/GGrXbp */

const Wrapper = styled.div<StyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  & > div:first-child {
    width: 10px;
    height: 10px;
    background-color: ${(props) => props.theme.colors[props.color]};
    border-radius: 10px;
    animation: dotElasticBefore 1.2s infinite linear;
  }

  & > div:nth-child(2) {
    width: 10px;
    height: 10px;
    background-color: ${(props) => props.theme.colors[props.color]};
    border-radius: 10px;
    animation: dotElastic 1.2s infinite linear;
  }

  & > div:nth-child(3) {
    width: 10px;
    height: 10px;
    background-color: ${(props) => props.theme.colors[props.color]};
    border-radius: 10px;
    animation: dotElasticAfter 1.2s infinite linear;
  }

  @keyframes dotElasticBefore {
    0% {
      transform: scale(1, 1);
    }
    25% {
      transform: scale(1, 1.5);
    }
    50% {
      transform: scale(1, 0.67);
    }
    75% {
      transform: scale(1, 1);
    }
    100% {
      transform: scale(1, 1);
    }
  }

  @keyframes dotElastic {
    0% {
      transform: scale(1, 1);
    }
    25% {
      transform: scale(1, 1);
    }
    50% {
      transform: scale(1, 1.5);
    }
    75% {
      transform: scale(1, 1);
    }
    100% {
      transform: scale(1, 1);
    }
  }

  @keyframes dotElasticAfter {
    0% {
      transform: scale(1, 1);
    }
    25% {
      transform: scale(1, 1);
    }
    50% {
      transform: scale(1, 0.67);
    }
    75% {
      transform: scale(1, 1.5);
    }
    100% {
      transform: scale(1, 1);
    }
  }
`;

interface Props {
  color: "primary" | "dark";
}

interface StyledProps {
  color: "primary" | "dark";
}

const Loading = ({ color }: Props) => {
  return (
    <Wrapper color={color}>
      <div></div>
      <div></div>
      <div></div>
    </Wrapper>
  );
};
export default Loading;
