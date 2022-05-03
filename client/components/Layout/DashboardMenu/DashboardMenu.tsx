import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdOutlineDashboard, MdOutlineSettings, MdMailOutline, MdOutlineDvr } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../features/store";
import { getInvites } from "../../../features/slices/invite/inviteSlice";

const Menu = styled.ul`
  list-style: none;
  font-weight: 700;
  padding: 20px;
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.colors.secondary};
  gap: 10px;
  border-right: 1px solid ${(props) => props.theme.colors.light};
  height: 100%;
`;

const MenuLink = styled.li<StyledProps>`
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: 0.3s;
  ${(props) =>
    props.isActive &&
    `background-color: ${props.theme.colors.lightPrimary};
    color: ${props.theme.colors.primary};`}

  &:hover {
    background-color: ${(props) => props.theme.colors.lightPrimary};
    color: ${(props) => props.theme.colors.primary};
  }
  svg {
    font-size: 1.5rem;
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
    if (invites !== null && invites.length > 0) {
      setInvitesCount(invites.length);
    }
    if (invites === null) {
      setInvitesCount(user.invites);
    }
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
    <>
      <Menu>
        <Link href={`/dashboard`} passHref>
          <MenuLink isActive={active === "dashboard" ? true : false}>
            <MdOutlineDashboard />
            Dashboard
          </MenuLink>
        </Link>

        <Link href={`/dashboard/projects`} passHref>
          <MenuLink isActive={active === "projects" ? true : false}>
            <MdOutlineDvr />
            Projects
          </MenuLink>
        </Link>
        <Link href={`/dashboard/invites`} passHref>
          <MenuLink isActive={active === "invites" ? true : false}>
            <MdMailOutline />
            Invites {invitesCount > 0 && <span className="total-invites">{invitesCount}</span>}
          </MenuLink>
        </Link>
        <Link href={`/dashboard/settings`} passHref>
          <MenuLink isActive={active === "settings" ? true : false}>
            <MdOutlineSettings />
            Settings
          </MenuLink>
        </Link>
      </Menu>
    </>
  );
};
export default DashboardMenu;
