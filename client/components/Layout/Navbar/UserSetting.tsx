import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "../../../features/store";
import { useRouter } from "next/router";
import DropDown from "../../Common/DropDown";
import ProfilePicture from "../../Common/ProfilePicture";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  img {
    border-radius: 100%;
  }
  span {
    font-weight: 600;
  }
`;

const Logout = styled.li`
  color: ${(props) => props.theme.colors.danger};
`;

interface Props {
  handleLogout: () => void;
}

const UserSetting = ({ handleLogout }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const dropDownRef = useRef<HTMLUListElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event: any) => {
    if (
      dropDownRef.current &&
      !dropDownRef.current.contains(event.target) &&
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  const handleDashboard = () => {
    router.push(`/dashboard/`);
    setIsOpen(false);
  };

  return (
    <>
      <Wrapper ref={wrapperRef} onClick={() => setIsOpen(!isOpen)}>
        <ProfilePicture userID={user?._id} />
        {user && <span>{user.username}</span>}
      </Wrapper>
      {isOpen && (
        <DropDown ref={dropDownRef}>
          <li onClick={handleDashboard}>Dashboard</li>
          <Logout onClick={handleLogout}>Logout</Logout>
        </DropDown>
      )}
    </>
  );
};
export default UserSetting;
