/* eslint-disable no-restricted-syntax,indent */

import { mix } from 'polished';

export default (variant, baseColor) => {
  switch (variant) {
    case 'focus':
      return mix(0.1, '#000', baseColor);
    case 'dark':
      return mix(0.25, '#000', baseColor);
    case 'light':
      return mix(0.25, '#fff', baseColor);
    case 'muted':
      return mix(0.5, '#fff', baseColor);
    case 'background':
      return mix(0.75, '#fff', baseColor);
    default:
      return baseColor;
  }
};
