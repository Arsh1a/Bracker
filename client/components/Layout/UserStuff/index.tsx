import React from "react";
import styled from "styled-components";
import Button from "../../Common/Button";
import Link from "next/link";
import Image from "next/image";
import UserSetting from "./UserSetting";

const Wrapper = styled.div``;

const Links = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 2rem;
  li {
    font-size: 1rem;
    cursor: pointer;
  }
  .login:hover {
    text-decoration: underline;
  }
`;

interface Props {
  currentUser: string | null | undefined;
  handleLogout: () => void;
}

const UserStuff = ({ currentUser, handleLogout }: Props) => {
  if (currentUser === undefined) return null;

  if (currentUser) return <UserSetting handleLogout={handleLogout} />;

  return (
    <Links>
      <Link href="/login" passHref>
        <li className="login">Login</li>
      </Link>
      <li>
        <Link href="/signup" passHref>
          <Button color="primary">Sign up</Button>
        </Link>
      </li>
    </Links>
  );
};
export default UserStuff;
