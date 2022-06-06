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

const StyledImage = styled(Image)`
  border-radius: 100%;
`;

interface Props {
  userID: string;
  width?: number;
  height?: number;
}

const ProfilePicture = ({ userID, width, height }: Props) => {
  const [image, setImage] = useState<any>();

  const { isSuccess } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    //Reset image cause if we dont, it will keep on showing the old image
    setImage(null);
    axios
      .get(`http://localhost:5000/api/auth/picture/${userID}`, {
        withCredentials: true,
      })
      .then((res) => {
        setImage(res.data);
      })
      .catch((err) => {});
  }, [isSuccess]);

  return (
    <Wrapper>
      {image ? (
        <StyledImage
          src={`data:${image.contentType};base64,${Buffer.from(image.data.data).toString(
            "base64"
          )}`}
          alt="Profile Picture"
          height={height ? height : 40}
          width={width ? width : 40}
          layout="fixed"
        />
      ) : (
        <StyledImage
          src="/images/user.png"
          alt="Default user picture"
          height={height ? height : 40}
          width={width ? width : 40}
          layout="fixed"
        />
      )}
    </Wrapper>
  );
};
export default ProfilePicture;
