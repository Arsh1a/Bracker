import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "../../../features/store";
import { logout, reset } from "../../../features/slices/auth/authSlice";
import UserStuff from "../Navbar/UserStuff";

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

interface Props {}

const DashboardNavbar = ({}: Props) => {
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
      <UserStuffWrapper>
        <UserStuff currentUser={currUser} handleLogout={handleLogout} />
      </UserStuffWrapper>
    </Wrapper>
  );
};
export default DashboardNavbar;
