import React from "react";
import styled from "styled-components";

const Wrapper = styled.input<StyledProps>`
  background-color: white;
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : "12px")};
  border: none;
  padding: 15px;
  width: 100%;
  transition: 0.3s;
  outline: 1px solid ${(props) => props.theme.colors.light};
  &:focus {
    outline: 2px solid ${(props) => props.theme.colors.primary};
  }
`;

const Label = styled.label`
  display: inline-block;
  font-weight: 700;
  font-size: 0.8rem;
  margin-bottom: 5px;
`;

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  label?: React.ReactNode;
  id?: string;
  borderRadius?: string;
}

interface StyledProps {
  borderRadius?: string;
}

const Input = ({ borderRadius, label, id, ...rest }: Props) => {
  return (
    <>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Wrapper borderRadius={borderRadius} id={id} {...rest}></Wrapper>
    </>
  );
};
export default Input;
