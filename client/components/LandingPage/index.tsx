import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Button from "../Common/Button";
import Container from "../Common/Container";

const Wrapper = styled.div`
  background-color: white;
  background: rgb(43, 138, 255);
  background: linear-gradient(
    180deg,
    rgba(43, 138, 255, 0.10157566444546573) 0%,
    rgba(255, 255, 255, 1) 100%
  );
`;

const StyledContainer = styled(Container)`
  max-width: 1400px;
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 550px;
  background-image: url("/images/Doodle Dots.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right;
  gap: 50px;

  @media screen and (max-width: 800px) {
    flex-direction: column;
    height: unset;
    margin: 60px 0;
  }
`;

const MainText = styled.div`
  flex: 2;
  h1 {
    font-size: 3rem;
    line-height: 3rem;
    margin-bottom: 20px;
  }
  p {
    font-size: 1.2rem;
  }
  button {
    font-size: 1.2rem;
    margin-top: 20px;
    padding: 10px 40px;
  }

  @media screen and (max-width: 1000px) {
    h1 {
      font-size: 2rem;
      line-height: 2rem;
    }
    p {
      font-size: 1rem;
    }
    button {
      font-size: 1rem;
      margin-top: 20px;
      padding: 10px 20px;
    }
  }
`;

const MainImage = styled.div`
  flex: 2;
`;

interface Props {}

const LandingPage = ({}: Props) => {
  return (
    <Wrapper>
      <StyledContainer>
        <Main>
          <MainText>
            <h1>
              Bracker helps teams work <br />
              together.
            </h1>
            <p>
              A simple but powerful bug tracking system that helps you manage and deal with bugs
              easier and deliver great products on time.
            </p>
            <Link href="/signup" passHref>
              <Button color="primary">Sign up</Button>
            </Link>
          </MainText>
          <MainImage>
            <Image
              style={{ borderRadius: "1rem" }}
              src="/images/landing.png"
              alt="Bracker"
              width="778px"
              height="438px"
            />
          </MainImage>
        </Main>
      </StyledContainer>
    </Wrapper>
  );
};
export default LandingPage;
