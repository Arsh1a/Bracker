import React from "react";
import styled from "styled-components";
import { MdOutlineDashboard, MdOutlineSettings } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";

const Menu = styled.ul`
  list-style: none;
  font-weight: 700;
  padding: 20px;
  display: flex;
  width: 230px;
  flex-direction: column;
  color: ${(props) => props.theme.colors.secondary};
  gap: 10px;
  border-right: 1px solid ${(props) => props.theme.colors.light};
  height: 100%;
  li {
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: 0.3s;
  }
  li:hover {
    background-color: ${(props) => props.theme.colors.lightPrimary};
    color: ${(props) => props.theme.colors.primary};
  }
  svg {
    font-size: 24px;
  }
`;

interface Props {}

const DashboardMenu = ({}: Props) => {
  return (
    <>
      <Menu>
        <Link href={`/dashboard/`} passHref>
          <li>
            <MdOutlineDashboard />
            Dashboard
          </li>
        </Link>

        <Link href={`/dashboard/projects`} passHref>
          <li>
            <MdOutlineDashboard />
            Projects
          </li>
        </Link>
        <Link href={`/dashboard/settings`} passHref>
          <li>
            <MdOutlineSettings />
            Settings
          </li>
        </Link>
        <Link href={`/dashboard/invites`} passHref>
          <li>
            <MdOutlineSettings />
            Invites
          </li>
        </Link>
      </Menu>
    </>
  );
};
export default DashboardMenu;
