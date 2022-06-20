import Image from "next/image";
import React from "react";
import styled from "styled-components";
import Container from "../Common/Container";
import LandingPageContainer from "./LandingPageContainer";

const Wrapper = styled.div`
  background-color: white;
`;

const InnerWrapper = styled.div`
  margin-top: 300px;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 80px;
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
    border-radius: 15px;
    transition: all 1s ease-in-out 0s;
    left: -30px;
    top: -25px;
    right: 25px;
    transform: rotate(-3deg);
  }
  img {
    border-radius: 20px;
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
              <p>Record, manage and track bugs easily and sort them based on your criteria.</p>
            </InfoText>
            <InfoImage>
              <Image
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
