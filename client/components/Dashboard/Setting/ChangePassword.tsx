import React, { useState } from "react";
import styled from "styled-components";
import { changePassword } from "../../../features/slices/auth/authSlice";
import { useAppDispatch } from "../../../lib/hooks";
import Button from "../../Common/Button";
import ContentWrapper from "../../Common/ContentWrapper";
import ErrorMessage from "../../Common/ErrorMessage";
import Input from "../../Common/Input";

const Wrapper = styled(ContentWrapper)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  input {
    margin-bottom: 20px;
  }
`;

const StyledErrorMessage = styled(ErrorMessage)`
  margin-top: 20px;
`;

interface Props {
  user: any;
  isLoading: boolean;
  isError: boolean;
  message: string;
  isSuccess: boolean;
}

const ChangePassword = ({ user, isLoading, isError, message, isSuccess }: Props) => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setConfirmPasswordError(true);
      return;
    }

    dispatch(changePassword(passwords));
  };

  return (
    <Wrapper>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          required
          onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
        />
        <Input
          type="password"
          name="newPassword"
          placeholder="New Password"
          required
          onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
        />
        <Button color="primary" type="submit">
          Change Password
        </Button>
        {isError ? (
          <StyledErrorMessage>{message}</StyledErrorMessage>
        ) : (
          confirmPasswordError && <StyledErrorMessage>Passwords do not match</StyledErrorMessage>
        )}
      </form>
    </Wrapper>
  );
};
export default ChangePassword;
