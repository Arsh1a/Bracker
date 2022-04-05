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
  width: 100%;
  &:hover {
    opacity: 0.8;
  }
`;

interface Props extends React.ComponentPropsWithRef<"button"> {
  children: React.ReactNode;
  color: "primary" | "secondary" | "light" | "dark";
  borderRadius?: string;
}

interface StyledProps {
  color: "primary" | "secondary" | "light" | "dark";
  borderRadius?: string;
  href?: string;
}

const Button = React.forwardRef<Props, any>(function Button(
  { children, color, borderRadius, ...rest },
  ref
) {
  return (
    <Wrapper color={color} borderRadius={borderRadius} {...rest}>
      {children}
    </Wrapper>
  );
});
export default Button;
