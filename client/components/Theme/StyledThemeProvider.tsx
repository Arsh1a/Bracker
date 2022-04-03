import { ReactNode } from "hoist-non-react-statics/node_modules/@types/react";
import React from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "../../styles/theme";

interface Props {
  children: ReactNode;
}

const StyledThemeProvider = ({ children }: Props) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
export default StyledThemeProvider;
