import styled from 'styled-components';
import forceImportant from 'styles/functions/forceImportant';
import pulsingAnimation from 'styles/animations/pulsing';
import { colors, media, type } from 'styles';

export const variantStyles = {
  outline: {
    bgColor: 'transparent',
    bgColorFocus: 'rgba(255, 255, 255, 0.05)',
    border: `1px solid ${colors.base}`,
    color: colors.base,
  },
  primary: {
    bgColor: colors.blue,
    bgColorFocus: colors.lightBlue,
    border: 0,
    color: colors.base,
  },
  white: {
    bgColor: colors.base,
    bgColorFocus: colors.secondaryGray,
    border: 0,
    color: colors.gray,
  },
};

// Forcing specificity so video-js does not override with their default style,
// see documentation for more details.
export const Button = styled.button`
  ${forceImportant`
    position: relative;
    background-color: ${({ variant }) => variantStyles[variant].bgColor};
    color: ${({ variant }) => variantStyles[variant].color};
    width: ${({ full }) => (full ? '100%' : 'auto')};
    opacity: ${({ faded }) => (faded ? '0.4' : '1')};
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
    border: ${({ variant }) => variantStyles[variant].border};
    border-radius: 2px;
    font-weight: ${type.weight.bold};
    outline: none;
    transition: background-color 0.2s;

    &.focus-visible {
      box-shadow: ${(p) => p.focusOutlineColor || colors.blue} 0px 0px 0px 3px;
      background-color: ${({ variant }) => variantStyles[variant].bgColorFocus};
    }

    &:hover:enabled {
      background-color: ${({ variant }) => variantStyles[variant].bgColorFocus};
    }

    ${({ size }) =>
      size === 'sm' &&
      `
      font-size: 1.4rem;
      padding: 12px 18px;
    `}

    ${({ size }) =>
      size === 'md' &&
      `
      font-size: 1.6rem;
      padding: 14px 36px;
    `}

    ${({ pulsing }) => pulsing && pulsingAnimation}

    ${media.min.baseline`
      ${({ size }) =>
        size === 'md' &&
        `
        font-size: 1.8rem;
        padding: 14px 40px;
      `}
    `}
  `}
`;

export const ButtonText = styled.span`
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
`;

export const LoadingWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;
