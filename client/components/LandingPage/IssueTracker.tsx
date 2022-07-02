import Image from "next/image";
import React from "react";
import styled from "styled-components";
import Container from "../Common/Container";
import LandingPageContainer from "./LandingPageContainer";

const Wrapper = styled.div`
  background-color: white;
`;

const InnerWrapper = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 180px;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 80px;
  align-items: center;
  @media screen and (max-width: 680px) {
    flex-direction: column;
  }
`;

const InfoText = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  h2 {
    font-size: 3rem;
  }
  p {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 450px) {
    h2 {
      font-size: 2rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;

const InfoImage = styled.div`
  flex: 1.5;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    background-color: ${(props) => props.theme.colors.primary};
    border-radius: 1rem;
    transition: all 1s ease-in-out 0s;
    left: -30px;
    top: -25px;
    right: 25px;
    transform: rotate(-3deg);
    @media screen and (max-width: 450px) {
      left: -15px;
      right: 35px;
    }
  }
  img {
    border-radius: 1rem;
  }
  @media screen and (max-width: 680px) {
    margin: 0 40px;
  }
  @media screen and (max-width: 450px) {
    margin: 0;
  }
`;

interface Props {}

const IssueTracker = ({}: Props) => {
  return (
    <Wrapper>
      <LandingPageContainer>
        <InnerWrapper>
          <InfoWrapper>
            <InfoText>
              <h2>Issue management</h2>
              <p>
                Record, manage and track bugs easily and sort them based on your criteria. Bracker
                helps to manage your issue log instead of messy spreadsheets or bulky software for
                bug, task, and issue tracking.
              </p>
            </InfoText>
            <InfoImage>
              <Image
                priority
                src="/images/create-ticket.jpg"
                alt="Create Ticket"
                width="688px"
                height="887px"
              />
            </InfoImage>
          </InfoWrapper>
        </InnerWrapper>
      </LandingPageContainer>
    </Wrapper>
  );
};
export default IssueTracker;
