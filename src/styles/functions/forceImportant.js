import { css } from 'styled-components';

// Temporary way of increasing the specificity of our custom video components so
// video-js does not override with their own default "skin" style.
// See documentation for more details
const forceImportant = (...args) => css`
  && {
    ${css(...args)};
  }
`;

export default forceImportant;
