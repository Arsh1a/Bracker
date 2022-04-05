import React from "react";
import styled from "styled-components";

const Wrapper = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  border-top: 1px solid #cecece;
`;

interface Props {}

const Footer = ({}: Props) => {
  return (
    <Wrapper>
      <span> © Copyright 2022. All rights reserved.</span>
    </Wrapper>
  );
};
export default Footer;
