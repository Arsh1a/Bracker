import React from "react";
import styled from "styled-components";

const Wrapper = styled.ul`
  position: absolute;
  z-index: 100;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  gap: 5px;
  padding: 10px 0;
  right: 25px;
  top: 75px;
  width: 130px;
  background-color: white;
  box-shadow: rgb(10 19 23 / 15%) 0px 2px 8px 0px;
  border-radius: 10px;
  list-style: none;
  font-weight: 500;
  li {
    cursor: pointer;
    &:hover {
      background-color: ${(props) => props.theme.colors.light};
    }
    padding: 5px 0;
  }
`;

interface Props extends React.ComponentPropsWithRef<"ul"> {
  children: React.ReactNode;
}

const DropDown = React.forwardRef<any, Props>(function DropDown({ children, ...rest }, ref) {
  return (
    <Wrapper ref={ref} {...rest}>
      {children}
    </Wrapper>
  );
});
export default DropDown;
