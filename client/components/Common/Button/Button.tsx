import React from "react";
import styled from "styled-components";

const Wrapper = styled.button<StyledProps>`
  background-color: ${(props) => props.theme.colors[props.color]};
  border-radius: 8px;
  padding: 8px 18px;
  border-style: none;
  font-size: 1rem;
  font-weight: 400;
  color: white;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    opacity: 0.8;
  }
`;

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color: "primary" | "secondary" | "light" | "dark";
}

interface StyledProps {
  color: "primary" | "secondary" | "light" | "dark";
}

const Button = ({ children, color, ...rest }: Props) => {
  return <Wrapper color={color}>{children}</Wrapper>;
};
export default Button;
