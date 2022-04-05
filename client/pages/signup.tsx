import React from "react";
import styled from "styled-components";
import Head from "next/head";
import Signup from "../components/Auth/Signup";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 100%;
  margin: 0 auto;
  max-width: 1400px;
  width: 100%;
  background-image: url("/images/work.svg");
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: 300px;
  background-position-x: left;
`;

interface Props {}

const login = ({}: Props) => {
  return (
    <Wrapper>
      <Head>
        <title>Register</title>
      </Head>
      <Signup />
    </Wrapper>
  );
};
export default login;
