import { css, keyframes } from 'styled-components';
import { colors } from 'styles';

const getKeyFrames = (color) => keyframes`
  0%, 100% {fill: ${color.dark}}
  50% {fill: ${color.light}}
`;

export default (colorName) => {
  const color = colors[colorName] || colors.blue;

  return css`
    animation: ${getKeyFrames(color)} 1.5s infinite;
  `;
};
