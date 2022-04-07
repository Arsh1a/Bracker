import React from "react";
import styled from "styled-components";

const Wrapper = styled.button<StyledProps>`
  background-color: ${(props) => props.theme.colors[props.color]};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : "12px")};
  padding: 8px 18px;
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
`;

interface Props extends React.ComponentPropsWithRef<"button"> {
  children: React.ReactNode;
  color: "primary" | "secondary" | "light" | "dark";
  borderRadius?: string;
  fullWidth?: boolean;
}

interface StyledProps {
  color: "primary" | "secondary" | "light" | "dark";
  fullWidth?: boolean;
  borderRadius?: string;
}

const Button = React.forwardRef<any, Props>(function Button(
  { children, fullWidth, color, borderRadius, ...rest },
  ref
) {
  return (
    <Wrapper fullWidth={fullWidth} color={color} borderRadius={borderRadius} {...rest}>
      {children}
    </Wrapper>
  );
});
export default Button;
