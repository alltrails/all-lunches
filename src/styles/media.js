/* eslint-disable prettier/prettier */
/* eslint-disable sort-keys */
import { css } from 'styled-components';

export const mobileWidthSizes = {
  small: 700,
  medium: 800,
  large: 900,
  xlarge: 1100,
  max: 1400,
};

export const widthSizes = {
  mobile: 320,
  mobileLandscape: 560,
  tablet: 700,
  baseline: 800,
  desktop: 1100,
  max: 1400,
};

export const heightSizes = {
  small: 300,
  tablet: 550,
  baseline: 600,
  desktop: 700,
  max: 850,
};

const media = {
  mobile: {
    small: (...args) => css`
      @media (min-width: ${mobileWidthSizes.small / 16}em) {
        ${css(...args)};
      }
    `,
    medium: (...args) => css`
      @media (min-width: ${mobileWidthSizes.medium / 16}em) {
        ${css(...args)};
      }
    `,
    large: (...args) => css`
      @media (min-width: ${mobileWidthSizes.large / 16}em) {
        ${css(...args)};
      }
    `,
    xlarge: (...args) => css`
      @media (min-width: ${mobileWidthSizes.xlarge / 16}em) {
        ${css(...args)};
      }
    `,
    max: (...args) => css`
      @media (min-width: ${mobileWidthSizes.max / 16}em) {
        ${css(...args)};
      }
    `,
  },
  min: {
    mobile: (...args) => css`
      @media (min-width: ${widthSizes.mobile / 16}em) {
        ${css(...args)};
      }
    `,
    mobileLandscape: (...args) => css`
      @media (min-width: ${widthSizes.mobileLandscape / 16}em) {
        ${css(...args)};
      }
    `,
    tablet: (...args) => css`
      @media (min-width: ${widthSizes.tablet / 16}em) {
        ${css(...args)};
      }
    `,
    baseline: (...args) => css`
      @media (min-width: ${widthSizes.baseline / 16}em) {
        ${css(...args)};
      }
    `,
    desktop: (...args) => css`
      @media (min-width: ${widthSizes.desktop / 16}em) {
        ${css(...args)};
      }
    `,
    max: (...args) => css`
      @media (min-width: ${widthSizes.max / 16}em) {
        ${css(...args)};
      }
    `,
  },
  minHeight: {
    small: (...args) => css`
      @media (min-height: ${heightSizes.mobile / 16}em) {
        ${css(...args)};
      }
    `,
    tablet: (...args) => css`
      @media (min-height: ${heightSizes.tablet / 16}em) {
        ${css(...args)};
      }
    `,
    baseline: (...args) => css`
      @media (min-height: ${heightSizes.baseline / 16}em) {
        ${css(...args)};
      }
    `,
    desktop: (...args) => css`
      @media (min-height: ${heightSizes.desktop / 16}em) {
        ${css(...args)};
      }
    `,
    max: (...args) => css`
      @media (min-height: ${heightSizes.max / 16}em) {
        ${css(...args)};
      }
    `,
  },
  twoDimMin: {
    mobile: (...args) => css`
      @media (min-width: ${widthSizes.mobile / 16}em) and (min-height: ${heightSizes.mobile / 16}em) {
        ${css(...args)};
      }
    `,
    mobileLandscape: (...args) => css`
      @media (min-width: ${widthSizes.mobileLandscape / 16}em) and (min-height: ${heightSizes.mobileLandscape / 16}em) {
        ${css(...args)};
      }
    `,
    tablet: (...args) => css`
      @media (min-width: ${widthSizes.tablet / 16}em) and (min-height: ${heightSizes.tablet / 16}em) {
        ${css(...args)};
      }
    `,
    baseline: (...args) => css`
      @media (min-width: ${widthSizes.baseline / 16}em) and (min-height: ${heightSizes.baseline / 16}em) {
        ${css(...args)};
      }
    `,
    desktop: (...args) => css`
      @media (min-width: ${widthSizes.desktop / 16}em) and (min-height: ${heightSizes.desktop / 16}em) {
        ${css(...args)};
      }
    `,
    max: (...args) => css`
      @media (min-width: ${widthSizes.max / 16}em) and (min-height: ${heightSizes.max / 16}em) {
        ${css(...args)};
      }
    `,
  },
};

export default media;
