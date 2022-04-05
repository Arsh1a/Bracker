import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Open Sans', sans-serif;
    box-sizing: border-box;
  }

  html,
  body, #__next {
    height: 100%;
    margin: 0;
  }
  
  #__next {
    display: flex;
    flex-direction: column;
  }

  body {
    margin: 0;
    padding: 0;
    background: white;
    font-family: Open-Sans, Helvetica, Sans-Serif;
    color: ${({ theme }) => theme.colors.dark};
    overflow-x: hidden;
  }

  h1,h2,h3,h4,h5,h6,p {
    margin: 0;
  }

  ul,li {
    margin: 0;
    padding: 0;
  }

  a {
    color: #256fc4;
  }
`;

export default GlobalStyle;
