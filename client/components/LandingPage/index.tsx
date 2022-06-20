import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Button from "../Common/Button";
import Container from "../Common/Container";
import IssueTracker from "./IssueTracker";
import Main from "./Main";

const Wrapper = styled.div``;

interface Props {}

const LandingPage = ({}: Props) => {
  return (
    <Wrapper>
      <Main />
      <IssueTracker />
    </Wrapper>
  );
};
export default LandingPage;
