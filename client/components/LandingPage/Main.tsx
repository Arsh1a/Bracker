import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Button from "../Common/Button";
import Container from "../Common/Container";
import LandingPageContainer from "./LandingPageContainer";

const Wrapper = styled.div``;

const InnerWrapper = styled.div`
  margin-top: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const MainText = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 100px;
  h1 {
    font-size: 3rem;
    @media screen and (max-width: 450px) {
      font-size: 2rem;
    }
  }
  p {
    font-size: 1.24rem;
    margin-top: 20px;
    margin-bottom: 50px;
    color: ${(props) => props.theme.colors.gray};
    @media screen and (max-width: 450px) {
      font-size: 1rem;
    }
  }
  button {
    font-size: 1rem;
    padding: 15px 40px;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 2px;
    @media screen and (max-width: 450px) {
      font-size: 0.8rem;
      padding: 10px 25px;
    }
  }
`;

const MainImage = styled.div`
  position: relative;
  top: 250px;
  span {
    border-radius: 20px;
    box-shadow: 0px 0px 35px -14px rgba(0, 0, 0, 0.197);
  }
  @media screen and (max-width: 600px) {
    top: 150px;
  }
`;

interface Props {}

const Main = ({}: Props) => {
  return (
    <Wrapper>
      <LandingPageContainer>
        <InnerWrapper>
          <MainText>
            <h1>Bracker helps teams work together.</h1>
            <p>
              A powerful open source bug tracking system that helps you manage and deal with bugs
              easier
              <br /> and deliver great products on time.
            </p>
            <Link href="/signup" passHref>
              <Button color="primary">Sign up for free</Button>
            </Link>
          </MainText>
          <MainImage>
            <Image src="/images/landing-image.png" alt="Bracker" width="1280px" height="580px" />
          </MainImage>
        </InnerWrapper>
      </LandingPageContainer>
    </Wrapper>
  );
};
export default Main;
