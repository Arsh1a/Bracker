import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  gap: 20px;
  border: 1px solid #cecece;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  width: 100%;
  max-width: 350px;
  h1 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.secondary};
  }
  span {
    font-size: 0.8rem;
    color: ${(props) => props.theme.colors.primary};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

interface Props {
  children: React.ReactNode;
}

const AuthContainer = ({ children }: Props) => {
  return <Wrapper>{children}</Wrapper>;
};
export default AuthContainer;
