import React from "react";
import styled from "styled-components";
import Input from "./Input";

const Wrapper = styled.div``;

interface Props {}

const SingleFormInput = ({}: Props) => {
  return (
    <Wrapper>
      <form>
        <Input />
      </form>
    </Wrapper>
  );
};
export default SingleFormInput;
