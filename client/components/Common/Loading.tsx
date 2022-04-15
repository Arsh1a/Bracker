import React from "react";
import styled from "styled-components";

/*Thanks to https://codepen.io/nzbin/pen/GGrXbp */

const Wrapper = styled.div<StyledProps>`
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors[props.color]};
  color: ${(props) => props.theme.colors[props.color]};
  animation: dotElastic 1s infinite linear;
  align-self: center;

  &::before,
  &::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
  }

  &::before {
    left: -15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.colors[props.color]};
    color: ${(props) => props.theme.colors[props.color]};
    animation: dotElasticBefore 1s infinite linear;
  }

  &::after {
    left: 15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.colors[props.color]};
    color: ${(props) => props.theme.colors[props.color]};
    animation: dotElasticAfter 1s infinite linear;
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
  return <Wrapper color={color}></Wrapper>;
};
export default Loading;
