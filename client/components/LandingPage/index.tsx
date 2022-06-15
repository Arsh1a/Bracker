import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Button from "../Common/Button";
import Container from "../Common/Container";

const Wrapper = styled.div`
  background-color: #fff;
`;

const StyledContainer = styled(Container)`
  max-width: 1400px;
`;

const Main = styled.main`
  display: flex;
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
    font-size: 4rem;
    line-height: 4rem;
    margin-bottom: 40px;
  }
  p {
    color: #656565;
    font-size: 1.2rem;
  }
  button {
    font-size: 1.2rem;
    margin-top: 20px;
    padding: 10px 40px;
  }

  @media screen and (max-width: 1000px) {
    h1 {
      font-size: 3rem;
      line-height: 3rem;
      margin-bottom: 20px;
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
            <h1>Bracker helps teams work together.</h1>
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
              src="/images/vector-illustrations.png"
              alt="Bracker"
              width="1000px"
              height="638px"
            />
          </MainImage>
        </Main>
      </StyledContainer>
    </Wrapper>
  );
};
export default LandingPage;
