import React, { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { BsListTask, BsHouse, BsGear, BsPlusCircle } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getInvites } from "../../../features/slices/invite/inviteSlice";

const Menu = styled.ul`
  list-style: none;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.colors.dark};
  gap: 10px;
  background-color: white;
  position: sticky;
  height: 100vh;
  top: 0;
  min-width: 200px;
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
    width: 3px;
    position: absolute;
    top: 11px;
    right: 0;
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

const ProjectMenu = ({}: Props) => {
  const [active, setActive] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInvites());
  }, [dispatch]);

  useEffect(() => {
    if (router.pathname === `/p/[slug]`) {
      setActive("home");
    } else if (router.pathname === `/p/[slug]/my-issues`) {
      setActive("my-issues");
    } else if (router.pathname === `/p/[slug]/settings`) {
      setActive("settings");
    } else if (router.pathname === `/p/[slug]/create-issue`) {
      setActive("create-issue");
    }
  }, [router.pathname]);

  return (
    <Menu>
      <Link href="/" passHref>
        <Logo>
          <Image src="/images/logo.svg" layout="fill" objectFit="contain" alt="Logo" />
        </Logo>
      </Link>
      <Link
        href={{
          pathname: "/p/[slug]/",
          query: { slug: router.query.slug },
        }}
        passHref
      >
        <MenuLink isActive={active === "home"}>
          <BsHouse />
          Home
        </MenuLink>
      </Link>
      <Link
        href={{
          pathname: "/p/[slug]/my-issues",
          query: { slug: router.query.slug },
        }}
        passHref
      >
        <MenuLink isActive={active === "my-issues"}>
          <BsListTask />
          My issues
        </MenuLink>
      </Link>
      <Link
        href={{
          pathname: "/p/[slug]/create-issue",
          query: { slug: router.query.slug },
        }}
        passHref
      >
        <MenuLink isActive={active === "create-issue"}>
          <BsPlusCircle />
          Create Issue
        </MenuLink>
      </Link>
      <Link
        href={{
          pathname: "/p/[slug]/settings",
          query: { slug: router.query.slug },
        }}
        passHref
      >
        <MenuLink isActive={active === "settings"}>
          <BsGear />
          Settings
        </MenuLink>
      </Link>
    </Menu>
  );
};
export default ProjectMenu;
