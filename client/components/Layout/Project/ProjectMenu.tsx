import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { GrTicket, GrLock, GrDocumentUser, GrAddCircle, GrHomeRounded } from "react-icons/gr";
import { FiSettings } from "react-icons/fi";

const Menu = styled.ul<{ isMenuOpen: boolean }>`
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
  min-width: 220px;
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
    font-size: 1.6rem;
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

interface Props {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}

const ProjectMenu = ({ isMenuOpen, setIsMenuOpen }: Props) => {
  const menuRef = useRef<HTMLUListElement>(null);
  const router = useRouter();

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
      <Link
        href={{
          pathname: "/p/[slug]/",
          query: { slug: router.query.slug },
        }}
        passHref
      >
        <MenuLink isActive={router.pathname === `/p/[slug]`}>
          <GrHomeRounded />
          Home
        </MenuLink>
      </Link>
      <Link
        href={{
          pathname: "/p/[slug]/tickets",
          query: { slug: router.query.slug },
        }}
        passHref
      >
        <MenuLink isActive={router.pathname === `/p/[slug]/tickets`}>
          <GrDocumentUser />
          Tickets
        </MenuLink>
      </Link>
      <Link
        href={{
          pathname: "/p/[slug]/create-ticket",
          query: { slug: router.query.slug },
        }}
        passHref
      >
        <MenuLink isActive={router.pathname === `/p/[slug]/create-ticket`}>
          <GrAddCircle />
          Create Ticket
        </MenuLink>
      </Link>
      <Link
        href={{
          pathname: "/p/[slug]/settings",
          query: { slug: router.query.slug },
        }}
        passHref
      >
        <MenuLink isActive={router.pathname === `/p/[slug]/settings`}>
          <FiSettings />
          Settings
        </MenuLink>
      </Link>
    </Menu>
  );
};
export default ProjectMenu;
