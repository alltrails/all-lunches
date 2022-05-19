/* eslint-env jest */

import shallowSetup from 'lib/testHelpers/shallowSetup';
import * as FilterTypes from 'constants/filterTypes';
import { reactRefMock } from '__mocks__';

import FilterMenu from '../FilterMenu';

describe('FilterMenu', () => {
  const defaultProps = {
    menuRef: reactRefMock,
    onMenuOptionClick: () => {},
    onSubmit: () => {},
    selectedMenuOption: null,
  };
  const setup = shallowSetup(FilterMenu, defaultProps);

  it('renders the expected view', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the expected view when menu option is selected', () => {
    const { wrapper } = setup({ selectedMenuOption: FilterTypes.LOW_TO_HIGH_FILTER_OPTION });
    expect(wrapper).toMatchSnapshot();
  });
});
