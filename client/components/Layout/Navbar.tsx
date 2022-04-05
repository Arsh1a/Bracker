import styled from "styled-components";
import Button from "../Common/Button";
import Link from "next/link";

const Wrapper = styled.nav`
  border-bottom: 1px solid #cecece;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
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
  return (
    <Wrapper>
      <Link href="/" passHref>
        <Logo>Bracker</Logo>
      </Link>
      <Links>
        <Link href="/login" passHref>
          <li>Login</li>
        </Link>
        <li>
          <Link href={"/signup"} passHref>
            <Button color="primary">Sing Up</Button>
          </Link>
        </li>
      </Links>
    </Wrapper>
  );
};
export default Navbar;
