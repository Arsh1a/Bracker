import React, { useEffect } from "react";
import styled from "styled-components";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import { useRouter } from "next/router";
import DashboardMenu from "./DashboardMenu/DashboardMenu";
import Cookies from "js-cookie";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
`;

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const router = useRouter();

  if (router.asPath.includes("dashboard")) {
    return (
      <>
        <Navbar />
        <Wrapper>
          <DashboardMenu />
          {children}
        </Wrapper>
      </>
    );
  }
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};
export default Layout;
