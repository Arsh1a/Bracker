import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

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

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/auth/picture/${userID}`, {
        withCredentials: true,
      })
      .then((res) => {
        setImage(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userID]);

  console.log(image);

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
        />
      ) : (
        <Image
          src="/images/user.png"
          alt="Default user picture"
          height={height ? height : 40}
          width={width ? width : 40}
        />
      )}
    </Wrapper>
  );
};
export default ProfilePicture;
