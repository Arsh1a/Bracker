import React from "react";
import styled from "styled-components";

const Wrapper = styled.input<StyledProps>`
  background-color: ${(props) => props.theme.colors.light};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : "12px")};
  border: none;
  padding: 15px;
  width: 100%;
  transition: 0.3s;
  outline: 1px solid #aeaeae;
  &:focus {
    outline: 2px solid ${(props) => props.theme.colors.primary};
  }
`;

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  borderRadius?: string;
}

interface StyledProps {
  borderRadius?: string;
}

const Input = ({ borderRadius, ...rest }: Props) => {
  return <Wrapper borderRadius={borderRadius} {...rest}></Wrapper>;
};
export default Input;
