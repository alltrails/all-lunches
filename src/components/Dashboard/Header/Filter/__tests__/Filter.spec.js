/* eslint-env jest */

import shallowSetup from 'lib/testHelpers/shallowSetup';
import * as FilterTypes from 'constants/filterTypes';
import { reactRefMock } from '__mocks__';

import Filter from '../Filter';

describe('Filter', () => {
  const defaultProps = {
    filterButtonRef: reactRefMock,
    isMenuOpen: false,
    onMenuOptionClick: () => {},
    onSubmit: () => {},
    selectedMenuOption: null,
    toggleMenuOpen: () => {},
  };
  const setup = shallowSetup(Filter, defaultProps);

  it('renders the expected view', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the expected view when menu is open', () => {
    const { wrapper } = setup({ isMenuOpen: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the expected view when menu is open and option is selected', () => {
    const { wrapper } = setup({
      isMenuOpen: true,
      selectedMenuOption: FilterTypes.LOW_TO_HIGH_FILTER_OPTION,
    });
    expect(wrapper).toMatchSnapshot();
  });
});
