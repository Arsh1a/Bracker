import React from "react";
import styled from "styled-components";
import Container from "./Container";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Header = styled.div`
  margin-bottom: 20px;
`;

interface Props {
  children: React.ReactNode;
  headerContent: React.ReactNode;
}

const DashboardPagesLayout = ({ children, headerContent }: Props) => {
  return (
    <Container>
      <Wrapper>
        <Header>{headerContent}</Header>
        {children}
      </Wrapper>
    </Container>
  );
};
export default DashboardPagesLayout;
