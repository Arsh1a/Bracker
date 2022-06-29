import React, { useState } from "react";
import type { AppProps } from "next/app";
import StyledThemeProvider from "../components/Theme/StyledThemeProvider";
import GlobalStyle from "../styles/globalStyle";
import Head from "next/head";
import { Provider } from "react-redux";
import NextNProgress from "nextjs-progressbar";
import { theme } from "../styles/theme";
import { store } from "../features/store";
import Layout from "../components/Layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Bracker | Bug Tracker</title>
        <meta
          name="description"
          content="Bracker is an open source bug tracker that provides a simple but powerful solution."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Bracker | Bug Tracker" />
        <meta
          property="og:description"
          content="Learn about 13 features that set Ahrefs apart from the competition."
        />
        <meta property="og:url" content="https://www.bracker.ir/" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:image" content="/images/landing-image.png/" />
      </Head>
      <Provider store={store}>
        <StyledThemeProvider>
          <GlobalStyle />
          <NextNProgress
            color={theme.colors.primary}
            startPosition={0.3}
            stopDelayMs={200}
            height={4}
            showOnShallow={true}
            options={{ showSpinner: false, easing: "ease", speed: 500 }}
          />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StyledThemeProvider>
      </Provider>
    </>
  );
}

export default MyApp;
