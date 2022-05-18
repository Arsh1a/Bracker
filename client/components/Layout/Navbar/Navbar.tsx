import { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../../Common/Button";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "../../../features/store";
import { logout, reset } from "../../../features/slices/auth/authSlice";
import UserStuff from "./UserStuff";
import Image from "next/image";

const Wrapper = styled.nav`
  border-top: none;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  top: 0;
  background-color: white;
`;

const Logo = styled.div`
  cursor: pointer;
  width: 110px;
  height: 100%;
  position: relative;
  transition: 0.3s;
  &:hover {
    opacity: 0.6;
  }
`;

interface Props {}

const Navbar = ({}: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  //The reason we use useState here instead of directly using user from selector
  //Is because Next.js throws an error
  const [currUser, setCurrUser] = useState<string | null>();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    router.push("/");
  };

  useEffect(() => {
    setCurrUser(user);
  }, [user]);

  return (
    <Wrapper>
      <Link href="/" passHref>
        <Logo>
          <Image src="/images/logo.svg" layout="fill" objectFit="contain" alt="Logo" />
        </Logo>
      </Link>
      <UserStuff currentUser={currUser} handleLogout={handleLogout} />
    </Wrapper>
  );
};
export default Navbar;
