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

interface Props extends React.ComponentPropsWithoutRef<"select"> {
  borderRadius?: string;
  children: React.ReactNode;
}

interface StyledProps {
  borderRadius?: string;
}

const Select = ({ children, borderRadius, ...rest }: Props) => {
  return (
    <Wrapper borderRadius={borderRadius}>
      <InnerWrapper {...rest}>{children}</InnerWrapper>
      <MdKeyboardArrowDown />
    </Wrapper>
  );
};
export default Select;
