import React, { useEffect } from "react";
import styled from "styled-components";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import { useRouter } from "next/router";
import DashboardMenu from "./Dashboard/DashboardMenu";
import Cookies from "js-cookie";
import DashboardNavbar from "./Dashboard/DashboardNavbar";
import ProjectMenu from "./Project/ProjectMenu";

const Wrapper = styled.div`
  display: flex;
`;

const InnerLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const router = useRouter();

  // Layout for the dashboard
  if (router.asPath.includes("/dashboard")) {
    return (
      <>
        <Wrapper>
          <DashboardMenu />
          <InnerLayout>
            <DashboardNavbar />
            {children}
          </InnerLayout>
        </Wrapper>
      </>
    );
  }
  //Layout for project page
  if (router.asPath.includes("/p/")) {
    return (
      <>
        <Wrapper>
          <ProjectMenu />
          <InnerLayout>
            <DashboardNavbar />
            {children}
          </InnerLayout>
        </Wrapper>
      </>
    );
  }
  // Layout for the other pages
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};
export default Layout;
