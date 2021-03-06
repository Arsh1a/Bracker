import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      lightPrimary: string;
      secondary: string;
      tertiary: string;
      light: string;
      dark: string;
      gray: string;
      danger: string;
      info: string;
      success: string;
    };
  }
}
