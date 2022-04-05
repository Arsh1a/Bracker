import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../Common/Button";
import Input from "../Common/Input";
import AuthContainer from "./AuthContainer";

const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ErrorMessage = styled.p`
  background-color: ${(props) => props.theme.colors.error};
  color: white;
  padding: 10px 20px;
  font-size: 0.8rem;
  text-align: left;
  border-radius: 10px;
`;

interface Props {}

const Signup = ({}: Props) => {
  const [errorMessage, setErrorMessage] = useState("E");
  return (
    <AuthContainer>
      <h1>Sign Up</h1>
      <Form>
        <Input borderRadius="6px" type="email" name="email" required placeholder="Email" />
        <Input borderRadius="6px" type="text" name="username" required placeholder="Username" />
        <Input borderRadius="6px" type="password" name="password" required placeholder="Password" />
        <Button borderRadius="6px" color="primary" type="submit">
          Log in
        </Button>
      </Form>
      <Link href="/login" passHref>
        <span>Already have an account? Log In</span>
      </Link>
      {errorMessage && (
        <ErrorMessage>
          Incorrect email address and / or password. Do you need help logging in?
        </ErrorMessage>
      )}
    </AuthContainer>
  );
};
export default Signup;
