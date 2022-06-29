import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { GrApps, GrBriefcase, GrMailOption, GrUserSettings } from "react-icons/gr";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../features/store";
import { getInvites } from "../../../features/slices/invite/inviteSlice";
import { useAppDispatch } from "../../../lib/hooks";

const Menu = styled.ul<{ isMenuOpen: boolean }>`
  list-style: none;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.colors.dark};
  gap: 10px;
  position: sticky;
  height: 100vh;
  top: 0;
  min-width: 220px;
  background-color: white;
  transition: 0.3s;
  @media screen and (max-width: 700px) {
    position: fixed;
    z-index: 50;
    left: -250px;
  }
  ${(props) => props.isMenuOpen && "left: 0 !important;"}
`;

const Logo = styled.div`
  cursor: pointer;
  position: relative;
  transition: 0.3s;
  text-align: center;
  margin-top: 15px;
  &:hover {
    opacity: 0.6;
  }
`;

const MenuLink = styled.li<StyledProps>`
  cursor: pointer;
  position: relative;
  padding: 10px 30px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: 0.3s;

  &:hover {
    opacity: 0.6;
  }
  svg {
    font-size: 1.5rem;
  }

  &:after {
    content: "";
    display: none;
    ${(props) => props.isActive && `display: block;`}
    width: 4px;
    position: absolute;
    top: 11px;
    right: -1px;
    bottom: 11px;
    height: 25px;
    background-color: ${(props) => props.theme.colors.primary};
  }

  .total-invites {
    font-size: 0.8rem;
    background-color: ${(props) => props.theme.colors.danger};
    color: white;
    border-radius: 100%;
    padding: 1px 6px;
  }
`;

interface StyledProps {
  isActive: boolean;
}

interface Props {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}

const DashboardMenu = ({ isMenuOpen, setIsMenuOpen }: Props) => {
  const [invitesCount, setInvitesCount] = useState(0);
  const menuRef = useRef<HTMLUListElement>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const { invites } = useSelector((state: RootState) => state.invite);

  useEffect(() => {
    dispatch(getInvites());
  }, [dispatch]);

  useEffect(() => {
    setInvitesCount(invites.length);
  }, [invites, user]);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isMenuOpen]);

  return (
    <Menu ref={menuRef} isMenuOpen={isMenuOpen}>
      <Link href="/" passHref>
        <Logo>
          <Image src="/images/logo.svg" height="50px" width="150px" alt="Logo" />
        </Logo>
      </Link>
      <Link href={`/dashboard`} passHref>
        <MenuLink onClick={() => setIsMenuOpen(false)} isActive={router.pathname === "/dashboard"}>
          <GrApps />
          Dashboard
        </MenuLink>
      </Link>

      <Link href={`/dashboard/projects`} passHref>
        <MenuLink
          onClick={() => setIsMenuOpen(false)}
          isActive={router.pathname === "/dashboard/projects"}
        >
          <GrBriefcase />
          Projects
        </MenuLink>
      </Link>
      <Link href={`/dashboard/invites`} passHref>
        <MenuLink
          onClick={() => setIsMenuOpen(false)}
          isActive={router.pathname === "/dashboard/invites"}
        >
          <GrMailOption />
          Invites {invitesCount > 0 && <span className="total-invites">{invitesCount}</span>}
        </MenuLink>
      </Link>
      <Link href={`/dashboard/settings`} passHref>
        <MenuLink
          onClick={() => setIsMenuOpen(false)}
          isActive={router.pathname === "/dashboard/settings"}
        >
          <GrUserSettings />
          Settings
        </MenuLink>
      </Link>
    </Menu>
  );
};
export default DashboardMenu;
