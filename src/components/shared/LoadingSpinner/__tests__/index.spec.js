/* eslint-env jest */

import shallowSetup from 'lib/testHelpers/shallowSetup';
import LoadingSpinner from '../index';

describe('LoadingSpinner', () => {
  const defaultProps = {};
  const setup = shallowSetup(LoadingSpinner, defaultProps);

  it('renders the expected view with no color option', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the expected view with a color option', () => {
    const { wrapper } = setup({ color: '#fff' });
    expect(wrapper).toMatchSnapshot();
  });
});
