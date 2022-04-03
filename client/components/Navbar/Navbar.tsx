import styled from "styled-components";
import Button from "../Common/Button/Button";

const Wrapper = styled.div`
  border-bottom: 1px solid #cecece;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
`;

const Links = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 2rem;

  & li {
    font-size: 1rem;
    cursor: pointer;
  }
`;

interface Props {}

const Navbar = ({}: Props) => {
  return (
    <Wrapper>
      <Logo>Bracker</Logo>
      <Links>
        <li>Login</li>
        <li>
          <Button color="primary">Register</Button>
        </li>
      </Links>
    </Wrapper>
  );
};
export default Navbar;
