/* eslint-env jest */

import shallowSetup from 'lib/testHelpers/shallowSetup';

import { Dashboard } from '../index';

describe('Dashboard', () => {
  const defaultProps = { isTouchScreen: false };
  const setup = shallowSetup(Dashboard, defaultProps);

  it('renders the expected view', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the expected view when a touch screen', () => {
    const { wrapper } = setup({ isTouchScreen: true });
    expect(wrapper).toMatchSnapshot();
  });
});
