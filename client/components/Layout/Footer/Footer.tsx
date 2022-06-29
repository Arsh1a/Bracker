import React from "react";
import styled from "styled-components";
import { GrGithub } from "react-icons/gr";
import Container from "../../Common/Container";

const Wrapper = styled.footer`
  background-color: white;
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Socials = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  svg {
    fill: #1f1f1f;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      opacity: 0.6;
    }
  }
`;

interface Props {}

const Footer = ({}: Props) => {
  return (
    <Wrapper>
      <Container>
        <InnerWrapper>
          <span> © 2022, Bracker</span>
          <Socials>
            <a href="https://github.com/Arsh1a/Bracker/" target="_blank" rel="noreferrer">
              <GrGithub size={30} />
            </a>
          </Socials>
        </InnerWrapper>
      </Container>
    </Wrapper>
  );
};
export default Footer;
