import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GetServerSideProps } from "next";
import { getSession } from "../../../lib/requestApi";
import DashboardPagesLayout from "../../Common/DashboardPagesLayout";
import { useSelector } from "react-redux";
import { RootState } from "../../../features/store";
import ProfilePicture from "../../Common/ProfilePicture";
import Input from "../../Common/Input";
import Button from "../../Common/Button";
import { useAppDispatch } from "../../../lib/hooks";
import { reset, updateUserInfo, uploadPicture } from "../../../features/slices/auth/authSlice";
import ErrorMessage from "../../Common/ErrorMessage";
import ContentWrapper from "../../Common/ContentWrapper";
import { MdModeEdit } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wrapper = styled(ContentWrapper)`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
  input {
    margin-bottom: 20px;
  }
`;

const EditProfilePicture = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  label {
    cursor: pointer;
  }
  form {
    transition: 0.3s;
    position: relative;
    &:hover {
      opacity: 0.7;
    }
  }
`;

const EditIcon = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  position: absolute;
  border-radius: 100%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 5px;
  right: -5px;
  svg {
    font-size: 1.2rem;
    color: white;
  }
`;

const ChosenPicture = styled.div`
  img {
    border-radius: 100%;
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

const EditProfile = ({ user, isLoading, isError, message, isSuccess }: Props) => {
  const [accountDetails, setAccountDetails] = useState({
    email: user?.email,
  });

  const [picture, setPicture] = useState<{ encoded: any; file: any }>({
    encoded: null,
    file: null,
  });

  const dispatch = useAppDispatch();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (user.email !== accountDetails.email) {
      dispatch(updateUserInfo(accountDetails));
    }

    if (picture.file) {
      dispatch(uploadPicture(picture.file));
      setPicture({ encoded: null, file: null });
    }
  };

  const handlePictureChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setPicture({
        encoded: URL.createObjectURL(file),
        file,
      });
    }
  };

  const handlePictureUpload = (e: any) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    dispatch(uploadPicture(file));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }
  }, [isSuccess]);
  return (
    <Wrapper>
      <h2>Edit Profile</h2>
      <EditProfilePicture>
        <form onSubmit={handlePictureUpload} encType="multipart/form-data" method="POST">
          <input
            accept="image/png, image/jpeg"
            type="file"
            id="image"
            name="image"
            style={{ display: "none" }}
            onChange={(e) => handlePictureChange(e)}
          />
          <label htmlFor="image">
            {picture.encoded ? (
              <ChosenPicture>
                <img src={picture.encoded} alt="profile" width={100} height={100} />
              </ChosenPicture>
            ) : (
              <ProfilePicture userID={user?._id} height={100} width={100} />
            )}
            <EditIcon>
              <MdModeEdit />
            </EditIcon>
          </label>
        </form>
      </EditProfilePicture>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          label="Email"
          id="email"
          name="email"
          value={accountDetails.email}
          onChange={(e) => setAccountDetails({ ...accountDetails, email: e.target.value })}
        />
        <Button color="primary" isLoading={isLoading} type="submit">
          Edit
        </Button>
      </form>
    </Wrapper>
  );
};
export default EditProfile;
