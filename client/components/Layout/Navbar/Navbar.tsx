import { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../../Common/Button";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "../../../features/store";
import { logout, reset } from "../../../features/slices/auth/authSlice";
import UserStuff from "../UserStuff";
import Image from "next/image";
import { useAppDispatch } from "../../../lib/hooks";
import Container from "../../Common/Container";
import UserLinks from "./UserLinks";

const Wrapper = styled.nav`
  z-index: 100;
  background-color: #fff;
  position: fixed;
  width: 100%;
`;

const StyledContainer = styled(Container)`
  padding-top: 20px;
  padding-bottom: 20px;
`;

const InnerWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  @media screen and (max-width: 500px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const Logo = styled.div`
  cursor: pointer;
  position: relative;
  transition: 0.3s;
  &:hover {
    opacity: 0.6;
  }
`;

interface Props {}

const Navbar = ({}: Props) => {
  const dispatch = useAppDispatch();
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
      <StyledContainer>
        <InnerWrapper>
          <Link href="/" passHref>
            <Logo>
              <Image src="/images/logo.svg" height="32px" width="150px" alt="Logo" />
            </Logo>
          </Link>
          <UserLinks currentUser={currUser} handleLogout={handleLogout} />
        </InnerWrapper>
      </StyledContainer>
    </Wrapper>
  );
};
export default Navbar;
