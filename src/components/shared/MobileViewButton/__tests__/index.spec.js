/* eslint-env jest */

import shallowSetup from 'lib/testHelpers/shallowSetup';
import MobileViewButton from '../index';

describe('MobileViewButton', () => {
  const defaultProps = {
    isMapViewEnabled: false,
    onClick: () => {},
  };
  const setup = shallowSetup(MobileViewButton, defaultProps);

  it('renders the expected view', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the expected view when map view is enabled', () => {
    const { wrapper } = setup({ isMapViewEnabled: true });
    expect(wrapper).toMatchSnapshot();
  });
});
