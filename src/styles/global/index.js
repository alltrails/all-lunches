import { createGlobalStyle } from 'styled-components';

import colors from 'styles/colors';

import normalize from './normalize';

// Set box-sizing globally to handle padding and border widths
const all = `
  *,
  *:after,
  *:before {
    box-sizing: border-box;
  }

  * {
    background-repeat: no-repeat;
  }
`;

// The base font-size is set at 62.5% for having the convenience
// of sizing rems in a way that is similar to using px: 1.6rem = 16px
const html = `
  html {
    box-sizing: border-box;
    background: ${colors.base};
    font-size: 62.5%;
    cursor: default;
    overflow-x: hidden;
  }
`;

const font = `
  body,
  input,
  textarea,
  select,
  button {
    font-family: Inter, Helvetica, Arial, san-serif;
    font-size: 1.6rem;
    line-height: 1.4;
    letter-spacing: .01em;
    color: ${colors.base};
    -webkit-font-smoothing: antialiased;
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${normalize};
  ${all};
  ${html};
  ${font};
`;
