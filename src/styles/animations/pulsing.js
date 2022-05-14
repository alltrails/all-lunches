import { css, keyframes } from 'styled-components';

const pulsing = keyframes`
  0% {opacity: 0.65}
  50% {opacity: 1}
  100% {opacity: 0.65}
`;

export default css`
  animation: ${pulsing} 1.5s infinite;
`;
