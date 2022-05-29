import React from "react";

import { ThemeProvider } from "styled-components";
import { theme } from "../../styles/theme";

interface Props {
  children: React.ReactNode;
}

const StyledThemeProvider = ({ children }: Props) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
export default StyledThemeProvider;
