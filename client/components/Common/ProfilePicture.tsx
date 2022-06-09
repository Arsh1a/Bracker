import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../features/store";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const StyledImage = styled.img`
  border-radius: 100%;
`;

interface Props {
  userID: string;
  width?: number;
  height?: number;
}

const ProfilePicture = ({ userID, width, height }: Props) => {
  const [picture, setPicture] = useState<string>("");

  const { isSuccess } = useSelector((state: RootState) => state.auth);

  const fetchPicure = () => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + `/auth/picture/${userID}`, {
        withCredentials: true,
      })
      .then((res) => {
        setPicture(res.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    fetchPicure();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      fetchPicure();
    }
  }, [isSuccess]);

  return (
    <Wrapper>
      {picture ? (
        <StyledImage
          src={process.env.NEXT_PUBLIC_UPLOADS_URL + "/profile-pictures/" + picture}
          alt="Profile Picture"
          height={height ? height : 40}
          width={width ? width : 40}
        />
      ) : (
        <Image
          src="/images/user.png"
          alt="Profile Picture"
          height={height ? height : 40}
          width={width ? width : 40}
        />
      )}
    </Wrapper>
  );
};
export default ProfilePicture;
