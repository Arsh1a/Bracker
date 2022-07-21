import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "../../../features/store";
import { logout, reset } from "../../../features/slices/auth/authSlice";
import UserStuff from "../UserStuff";
import { useAppDispatch } from "../../../lib/hooks";
import { GrMenu } from "react-icons/gr";
import { resetAll } from "../../../lib/utils";

const Wrapper = styled.nav`
  border-top: none;
  padding: 30px;
  padding-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  top: 0;
`;

const UserStuffWrapper = styled.div`
  margin-left: auto;
`;

const OpenMenuButton = styled.div`
  display: none;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    opacity: 0.6;
  }
  @media screen and (max-width: 700px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

interface Props {
  setIsMenuOpen: (isOpen: boolean) => void;
}

const DashboardNavbar = ({ setIsMenuOpen }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  //The reason we use useState here instead of directly using user from selector
  //Is because Next.js throws an error
  const [currUser, setCurrUser] = useState<string | null>();

  const handleLogout = () => {
    dispatch(logout());
    resetAll(dispatch);
    router.push("/");
  };

  useEffect(() => {
    setCurrUser(user);
  }, [user]);

  return (
    <Wrapper>
      <OpenMenuButton onClick={() => setIsMenuOpen(true)}>
        <GrMenu size="25px" />
      </OpenMenuButton>
      <UserStuffWrapper>
        <UserStuff currentUser={currUser} handleLogout={handleLogout} />
      </UserStuffWrapper>
    </Wrapper>
  );
};
export default DashboardNavbar;
