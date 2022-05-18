import styled, { keyframes } from 'styled-components';

const ringspin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const RingSpinner = styled.div`
  display: inline-block;
  position: relative;
  vertical-align: sub;

  /* Control the overall diameter of the circle here */
  width: 2.2rem;
  height: 2.2rem;

  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;

    /* Control the width of the circular line here */
    border: 3px solid;

    /* Make different border sides transparent for different patterns */
    ${({ color }) => `
      border-color: ${color} ${color} transparent transparent;
    `}

    /* Changing cubic-bezier
     * See http://cubic-bezier.com to make easy variants
     */
    animation: ${ringspin} 1.2s cubic-bezier(.57,.05,.58,.94) infinite;
  }

  & div:nth-child(1) {
    animation-delay: -0.25s;
  }
  & div:nth-child(2) {
    animation-delay: -0.17s;
  }
  & div:nth-child(3) {
    animation-delay: -0.1s;
  }
`;
