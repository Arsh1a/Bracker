import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 20px;
  margin: auto auto;
  max-width: 1400px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

interface Props {
  children: React.ReactNode;
}

const Container = ({ children, ...rest }: Props) => {
  return <Wrapper {...rest}>{children}</Wrapper>;
};
export default Container;
