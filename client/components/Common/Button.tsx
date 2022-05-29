import React from "react";
import styled from "styled-components";

const Wrapper = styled.button<StyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => props.height && `height: ${props.height}`};
  background-color: ${(props) => props.theme.colors[props.color]};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : "12px")};
  padding: ${(props) => (props.padding ? props.padding : "8px 18px;")};
  border-style: none;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  cursor: pointer;
  transition: 0.3s;
  ${(props) => props.fullWidth && "width: 100%"};
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
  borderRadius?: string;
  fullWidth?: boolean;
  height?: string;
  padding?: string;
}

interface StyledProps {
  color: "primary" | "secondary" | "light" | "dark" | "danger" | "success";
  fullWidth?: boolean;
  borderRadius?: string;
  height?: string;
  padding?: string;
}

const Button = React.forwardRef<any, Props>(function Button(
  { children, fullWidth, color, borderRadius, padding, height, ...rest },
  ref
) {
  return (
    <Wrapper
      fullWidth={fullWidth}
      color={color}
      borderRadius={borderRadius}
      padding={padding}
      height={height}
      ref={ref}
      {...rest}
    >
      {children}
    </Wrapper>
  );
});
export default Button;
