import React from "react";
import { GrClose } from "react-icons/gr";
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
  position: relative;
  background-color: white;
  margin: auto;
  padding: 20px;
  box-shadow: rgb(10 19 23 / 5%) 0px 2px 8px 0px;
  border-radius: 10px;
  width: 600px;
`;

const CloseIcon = styled.div`
  position: absolute;
  font-size: 1.2rem;
  right: 20px;
  cursor: pointer;
  transition: 0.3s;
  z-index: 100;
  &:hover {
    opacity: 0.5;
  }
`;

interface Props {
  children: React.ReactNode;
  closeModal: () => void;
}

const Modal = ({ children, closeModal }: Props) => {
  return (
    <Wrapper>
      <InnerWrapper>
        <CloseIcon onClick={closeModal}>
          <GrClose />
        </CloseIcon>
        {children}
      </InnerWrapper>
    </Wrapper>
  );
};
export default Modal;
