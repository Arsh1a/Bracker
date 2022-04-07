import styled from "styled-components";
import Button from "../Common/Button";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "../../features/context/store";
import { logout, reset } from "../../features/slices/auth/authSlice";

const Wrapper = styled.nav`
  border-bottom: 1px solid ${(props) => props.theme.colors.light};
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-direction: column;
  gap: 20px;
  @media (min-width: 400px) {
    flex-direction: row;
  }
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  cursor: pointer;
`;

const Links = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 2rem;

  li {
    font-size: 1rem;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

interface Props {}

const Navbar = ({}: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    router.push("/");
  };

  return (
    <Wrapper>
      <Link href="/" passHref>
        <Logo>Bracker</Logo>
      </Link>
      {!user ? (
        <Links>
          <Link href="/login" passHref>
            <li>Login</li>
          </Link>
          <li>
            <Link href={"/signup"} passHref>
              <Button color="primary">Sign up</Button>
            </Link>
          </li>
        </Links>
      ) : (
        <Button color={"secondary"} onClick={handleLogout}>
          Logout
        </Button>
      )}
    </Wrapper>
  );
};
export default Navbar;
