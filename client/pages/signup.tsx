import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../components/Common/Button";
import Input from "../components/Common/Input";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/slices/auth/authSlice";
import { RootState } from "../features/store";
import { useRouter } from "next/router";
import Loading from "../components/Common/Loading";
import Container from "../components/Common/Container";

const AuthContainer = styled(Container)`
  margin: auto auto;
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  gap: 20px;
  border: 1px solid ${(props) => props.theme.colors.light};
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  width: 100%;
  max-width: 350px;
  h1 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.secondary};
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
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
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
    dispatch(register(userData));
  };

  return (
    <AuthContainer center={true}>
      <InnerWrapper>
        <h1>Sign up</h1>
        <Form onSubmit={handleSubmit}>
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
          <Button fullWidth borderRadius="6px" color="primary" type="submit">
            Sign up
          </Button>
        </Form>
        <Link href="/login" passHref>
          <span>Already have an account? Log In</span>
        </Link>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {isLoading && <Loading />}
      </InnerWrapper>
    </AuthContainer>
  );
};
export default Signup;
