import React from "react";
import styled from "styled-components";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

//Need to make custom select dropdown or make whole select component custom

const Wrapper = styled.div<StyledProps>`
  background-color: white;
  position: relative;
  svg {
    position: absolute;
    right: 10px;
    top: 25%;
    z-index: 14;
    font-size: 1.4rem;
  }
`;

const InnerWrapper = styled.select<StyledProps>`
  z-index: 15;
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : "12px")};
  background-color: transparent;
  border: none;
  padding: 15px;
  width: 100%;
  transition: 0.3s;
  outline: 1px solid ${(props) => props.theme.colors.light};
  cursor: pointer;
  &:focus {
    outline: 2px solid ${(props) => props.theme.colors.primary};
  }
  appearance: none;
`;

const Label = styled.label`
  display: inline-block;
  font-weight: 700;
  font-size: 0.8rem;
  margin-bottom: 5px;
`;

interface Props extends React.ComponentPropsWithoutRef<"select"> {
  borderRadius?: string;
  label?: string;
  id?: string;
  children: React.ReactNode;
}

interface StyledProps {
  borderRadius?: string;
}

const Select = ({ children, borderRadius, label, id, ...rest }: Props) => {
  return (
    <>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Wrapper borderRadius={borderRadius}>
        <InnerWrapper id={id} {...rest}>
          {children}
        </InnerWrapper>
        <MdKeyboardArrowDown />
      </Wrapper>
    </>
  );
};
export default Select;
