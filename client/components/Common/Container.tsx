import React from "react";
import styled from "styled-components";

const Wrapper = styled.div<StyledProps>`
  padding: 30px;
  margin: 0 auto;
  max-width: 1400px;
  width: 100%;
  display: flex;
  ${(props) => props.center && "justify-content: center;"}
  ${(props) => props.flexDirection && `flex-direction: ${props.flexDirection};`}
`;

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  center?: boolean;
  flexDirection?: "row" | "column";
}

interface StyledProps {
  center?: boolean;
  flexDirection?: "row" | "column";
}

const Container = ({ children, center, flexDirection, ...rest }: Props) => {
  return (
    <Wrapper center={center} flexDirection={flexDirection} {...rest}>
      {children}
    </Wrapper>
  );
};
export default Container;
