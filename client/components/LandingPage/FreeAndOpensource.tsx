import React from "react";
import styled from "styled-components";
import LandingPageContainer from "./LandingPageContainer";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.primary};

  margin-top: 300px;
`;

const InnerWrapper = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  gap: 180px;
`;

const InfoText = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  h2 {
    font-size: 2rem;
  }
  p {
    font-size: 1.2rem;
  }
  a {
    color: white;
  }
  @media screen and (max-width: 450px) {
    h2 {
      font-size: 1.4rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;

interface Props {}

const FreeAndOpensource = ({}: Props) => {
  return (
    <Wrapper>
      <LandingPageContainer>
        <InnerWrapper>
          <InfoText>
            <h2>Free and open-source</h2>
            <p>
              Bracker is completely free to use and open-source to which you can help improve by
              contributing through{" "}
              <a href="https://github.com/" target="_blank" rel="noreferrer">
                github
              </a>
              .
            </p>
          </InfoText>
        </InnerWrapper>
      </LandingPageContainer>
    </Wrapper>
  );
};
export default FreeAndOpensource;
