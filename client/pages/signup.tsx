import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../components/Common/Button";
import Input from "../components/Common/Input";
import { useSelector, useDispatch } from "react-redux";
import { login, register, reset } from "../features/slices/auth/authSlice";
import { RootState, AppDispatch } from "../features/store";
import { useRouter } from "next/router";
import Loading from "../components/Common/Loading";
import Container from "../components/Common/Container";
import ErrorMessage from "../components/Common/ErrorMessage";
import { useAppDispatch } from "../lib/hooks";
import ContentWrapper from "../components/Common/ContentWrapper";

const AuthContainer = styled(Container)`
  margin: auto auto;
  margin-top: 110px;
`;

const StyledContentWrapper = styled(ContentWrapper)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  text-align: center;
  width: 100%;
  max-width: 350px;
  h1 {
    font-size: 1.5rem;
  }
  span {
    font-size: 0.8rem;
    color: ${(props) => props.theme.colors.primary};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

interface Props {}

const Signup = ({}: Props) => {
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isError) {
      setErrorMessage(message);
    }
    if (isSuccess || user) {
      router.push(`/dashboard`);
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch, router]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setErrorMessage("");
    dispatch(register(userData));
  };

  const loginAsGuest = () => {
    dispatch(login({ email: "demouser@gmail.com", password: "12345678" }));
  };

  return (
    <AuthContainer center={true}>
      <StyledContentWrapper>
        <h1>Sign up</h1>
        <Form onSubmit={handleSubmit}>
          <Input
            borderRadius="6px"
            type="text"
            name="name"
            placeholder="Name"
            required
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
          <Input
            borderRadius="6px"
            type="text"
            name="username"
            placeholder="Username"
            required
            value={userData.username}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
          />
          <Input
            borderRadius="6px"
            type="email"
            name="email"
            placeholder="Email"
            required
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
          <Input
            borderRadius="6px"
            type="password"
            name="password"
            placeholder="Password"
            required
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          />
          <Button isLoading={isLoading} fullWidth color="primary" type="submit">
            Sign Up
          </Button>
        </Form>
        <Link href="/login" passHref>
          <span>Already have an account? Log In</span>
        </Link>
        <span onClick={loginAsGuest}>Login as a guest</span>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </StyledContentWrapper>
    </AuthContainer>
  );
};
export default Signup;
