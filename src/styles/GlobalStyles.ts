import { createGlobalStyle } from 'styled-components';
import { media } from './styles';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }

  html {
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, sans-serif;
    font-size: 62.5%; /*1rem = 10px; 10/16px = 62.5%*/
    overflow-x: hidden;
    box-sizing: border-box;

    ${media.big_desktop`
      font-size: 75%;
    `}

    ${media.tablet_land`
      font-size: 56.25%;
    `}

    ${media.tablet_port`
      font-size: 50%;
    `}
    
    ${media.phone`
      font-size: 40%;
    `}
  }

  body {
    width: 100vw;
    display: flex;
    flex-direction: column;
  }

  h1 {
    font-size: 3rem;
    font-weight: 600;
    letter-spacing: .2rem;
    text-align: center;
  }

  h2 {
    font-size: 2rem;
    font-weight: 500;
    letter-spacing: .1rem;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 400;
    letter-spacing: .1rem;
  }

  h4 {
    font-size: 1.5rem;
    font-weight: 300;
    letter-spacing: .1rem;
  }

  p {
    font-size: 1.25rem;
    font-weight: 300;
    text-align: justify;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }
`;

export default GlobalStyles;