import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import LandingPage from "../components/LandingPage";
import axios from "axios";

const Home: NextPage = () => {
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ping`);
  }, []);

  return (
    <div>
      <LandingPage />
    </div>
  );
};

export default Home;
