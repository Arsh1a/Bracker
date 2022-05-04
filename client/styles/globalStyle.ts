import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Quicksand', sans-serif;
    box-sizing: border-box;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #999; 
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #777; 
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
