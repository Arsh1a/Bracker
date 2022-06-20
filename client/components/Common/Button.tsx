import React from "react";
import styled from "styled-components";
import Loading from "./Loading";

const Wrapper = styled.button<StyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors[props.color]};
  border-radius: 24px;
  padding: 8px 18px;
  border-style: none;
  font-size: 1rem;
  min-height: 36px;
  font-weight: 500;
  color: white;
  cursor: pointer;
  transition: 0.3s;
  ${(props) => props.fullWidth && "width: 100%"};
  box-shadow: 0 0.55em 1em -0.6em ${(props) => props.theme.colors[props.color]};
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    background-color: ${(props) => props.theme.colors.light};
    color: ${(props) => props.theme.colors.dark};
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface Props extends React.ComponentPropsWithRef<"button"> {
  children: React.ReactNode;
  color: "primary" | "secondary" | "light" | "dark" | "danger" | "success";
  fullWidth?: boolean;
  isLoading?: boolean;
}

interface StyledProps {
  color: "primary" | "secondary" | "light" | "dark" | "danger" | "success";
  fullWidth?: boolean;
}

const Button = React.forwardRef<any, Props>(function Button(
  { children, fullWidth, color, isLoading, ...rest },
  ref
) {
  if (isLoading) {
    return (
      <Wrapper fullWidth={fullWidth} color={"light"} ref={ref} {...rest} disabled>
        <Loading color="dark" />
      </Wrapper>
    );
  }
  return (
    <Wrapper fullWidth={fullWidth} color={color} ref={ref} {...rest}>
      {children}
    </Wrapper>
  );
});
export default Button;
