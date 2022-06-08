import React from "react";
import styled from "styled-components";
import { GrGithub } from "react-icons/gr";

const Wrapper = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;
  align-items: center;
  height: 70px;
  background-color: white;
  box-shadow: 0px -5px 11px -2px rgba(0, 0, 0, 0.04);
`;

const Socials = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  svg {
    fill: #70baff;
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
      <span> © 2022, Bracker</span>
      <Socials>
        <a href="https://github.com/Arsh1a/Bracker/" target="_blank" rel="noreferrer">
          <GrGithub size={30} />
        </a>
      </Socials>
    </Wrapper>
  );
};
export default Footer;
