import React, { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { BsGear, BsColumnsGap, BsJournals, BsMailbox } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../features/store";
import { getInvites } from "../../../features/slices/invite/inviteSlice";

const Menu = styled.ul`
  list-style: none;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.colors.dark};
  gap: 10px;
  position: sticky;
  height: 100vh;
  top: 0;
  min-width: 200px;
  background-color: white;
`;

const Logo = styled.div`
  cursor: pointer;
  width: 110px;
  height: 50px;
  position: relative;
  transition: 0.3s;
  margin: 15px 32px;
  margin-bottom: 0;
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

interface Props {}

const DashboardMenu = ({}: Props) => {
  const [active, setActive] = useState("");
  const [invitesCount, setInvitesCount] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const { invites } = useSelector((state: RootState) => state.invite);

  useEffect(() => {
    dispatch(getInvites());
  }, [dispatch]);

  useEffect(() => {
    setInvitesCount(invites.length);
  }, [invites, user]);

  useEffect(() => {
    if (router.pathname === "/dashboard") {
      setActive("dashboard");
    } else if (router.pathname === "/dashboard/projects") {
      setActive("projects");
    } else if (router.pathname === "/dashboard/invites") {
      setActive("invites");
    } else if (router.pathname === "/dashboard/settings") {
      setActive("settings");
    }
  }, [router.pathname]);

  return (
    <Menu>
      <Link href="/" passHref>
        <Logo>
          <Image src="/images/logo.svg" layout="fill" objectFit="contain" alt="Logo" />
        </Logo>
      </Link>
      <Link href={`/dashboard`} passHref>
        <MenuLink isActive={active === "dashboard"}>
          <BsColumnsGap />
          Dashboard
        </MenuLink>
      </Link>

      <Link href={`/dashboard/projects`} passHref>
        <MenuLink isActive={active === "projects"}>
          <BsJournals />
          Projects
        </MenuLink>
      </Link>
      <Link href={`/dashboard/invites`} passHref>
        <MenuLink isActive={active === "invites"}>
          <BsMailbox />
          Invites {invitesCount > 0 && <span className="total-invites">{invitesCount}</span>}
        </MenuLink>
      </Link>
      <Link href={`/dashboard/settings`} passHref>
        <MenuLink isActive={active === "settings"}>
          <BsGear />
          Settings
        </MenuLink>
      </Link>
    </Menu>
  );
};
export default DashboardMenu;
