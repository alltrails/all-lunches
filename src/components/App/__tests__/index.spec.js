/* eslint-env jest */

import shallowSetup from 'lib/testHelpers/shallowSetup';

import { App } from '../index';

describe('App', () => {
  const defaultProps = { error: null, isLoading: false };
  const setup = shallowSetup(App, defaultProps);

  it('renders the expected view', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the expected view when loading', () => {
    const { wrapper } = setup({ isLoading: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the expected view when there is an error', () => {
    const { wrapper } = setup({ error: 'looks like there was an error' });
    expect(wrapper).toMatchSnapshot();
  });
});
