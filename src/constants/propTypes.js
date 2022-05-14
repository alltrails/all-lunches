import { any, shape, string, oneOfType, func, instanceOf, Element } from 'prop-types';

export const textFieldThemeType = shape({
  container: shape({
    background: string,
    border: shape({
      default: string,
      error: string,
    }),
  }),
  input: shape({
    color: shape({
      default: string,
    }),
  }),
  label: shape({
    color: shape({
      default: string,
      error: string,
    }),
  }),
});

export const refType = oneOfType([func, shape({ current: instanceOf(Element) })]);

export const userType = any;
