import React, { ComponentPropsWithoutRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  box-shadow: rgb(10 19 23 / 5%) 0px 2px 8px 0px;
  background-color: white;
  padding: 30px;
  border-radius: 12px;
`;

interface Props extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}

const ContentWrapper = ({ children, ...rest }: Props) => {
  return <Wrapper {...rest}>{children}</Wrapper>;
};
export default ContentWrapper;
