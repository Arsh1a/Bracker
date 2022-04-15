import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  z-index: 100;
  display: flex;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.522);
  padding: 20px;
`;

const InnerWrapper = styled.div`
  background-color: white;
  margin: auto;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.colors.light};
  border-radius: 10px;
  width: 600px;
`;

interface Props {
  children: React.ReactNode;
}

const Modal = ({ children }: Props) => {
  return (
    <Wrapper>
      <InnerWrapper>{children}</InnerWrapper>
    </Wrapper>
  );
};
export default Modal;
