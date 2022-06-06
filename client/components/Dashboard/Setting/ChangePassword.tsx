import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

interface Props {
  user: any;
  isLoading: boolean;
  isError: boolean;
  message: string;
  isSuccess: boolean;
}

const ChangePassword = ({ user, isLoading, isError, message, isSuccess }: Props) => {
  return <Wrapper></Wrapper>;
};
export default ChangePassword;
