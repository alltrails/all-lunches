import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import 'focus-visible';

import withStyles from './withStyles';
import withSuspense from './withSuspense';
import withProvider from './withProvider';

export const decorators = [withSuspense, withStyles, withProvider];

export const parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
};
