/* eslint-env jest */

import shallowSetup from 'lib/testHelpers/shallowSetup';
import ErrorView from '../index';

describe('ErrorView', () => {
  const defaultProps = {};
  const setup = shallowSetup(ErrorView, defaultProps);

  it('renders the expected view when the text prop exists', () => {
    const { wrapper } = setup({ text: 'Sorry, an error occurred.' });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the expected view when the text prop does not exist', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
