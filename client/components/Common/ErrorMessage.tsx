import React, { ComponentPropsWithRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.danger};
  color: white;
  padding: 15px 20px;
  font-size: 0.8rem;
  text-align: left;
  border-radius: 10px;
`;

interface Props extends ComponentPropsWithRef<"div"> {
  children: React.ReactNode;
}

const ErrorMessage = ({ children, ...rest }: Props) => {
  return <Wrapper {...rest}>{children}</Wrapper>;
};
export default ErrorMessage;
