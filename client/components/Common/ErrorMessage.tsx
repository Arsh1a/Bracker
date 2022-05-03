import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.danger};
  color: white;
  padding: 10px 20px;
  font-size: 0.8rem;
  text-align: left;
  border-radius: 10px;
`;

interface Props {
  children: React.ReactNode;
}

const ErrorMessage = ({ children }: Props) => {
  return <Wrapper>{children}</Wrapper>;
};
export default ErrorMessage;
