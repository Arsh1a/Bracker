import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../components/Common/Button";
import Input from "../components/Common/Input";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/slices/auth/authSlice";
import { RootState } from "../features/store";
import { useRouter } from "next/router";
import Loading from "../components/Common/Loading";
import Container from "../components/Common/Container";
import ErrorMessage from "../components/Common/ErrorMessage";

const AuthContainer = styled(Container)`
  margin: auto auto;
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  gap: 20px;
  box-shadow: rgb(10 19 23 / 5%) 0px 2px 8px 0px;
  border-radius: 10px;
  padding: 20px;
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

const Login = ({}: Props) => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
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
    dispatch(login(userData));
  };
  return (
    <AuthContainer center={true}>
      <InnerWrapper>
        <h1>Login</h1>
        <Form onSubmit={handleSubmit}>
          <Input
            borderRadius="6px"
            type="email"
            name="email"
            required
            placeholder="Email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
          <Input
            borderRadius="6px"
            type="password"
            name="password"
            required
            placeholder="Password"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          />
          <Button
            height="40px"
            disabled={isLoading}
            fullWidth
            borderRadius="6px"
            color="primary"
            type="submit"
          >
            {isLoading ? <Loading color="dark" /> : "Login"}
          </Button>
        </Form>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Link href="/signup" passHref>
          <span>Don&apos;t have an account yet? Sign Up</span>
        </Link>
      </InnerWrapper>
    </AuthContainer>
  );
};

export default Login;
