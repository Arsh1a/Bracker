import React from "react";
import styled from "styled-components";
import Container from "../Common/Container";

const Wrapper = styled(Container)`
  max-width: 1200px;
`;

interface Props {
  children: React.ReactNode;
}

const LandingPageContainer = ({ children }: Props) => {
  return <Wrapper>{children}</Wrapper>;
};
export default LandingPageContainer;
