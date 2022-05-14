import { css, keyframes } from 'styled-components';

const flashing = keyframes`
  0% {opacity: 0.65}
  49% {opacity: 0.65}
  50% {opacity: 1}
`;

export default css`
  animation: ${flashing} 1s infinite;
`;
