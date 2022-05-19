/* eslint-env jest */

import shallowSetup from 'lib/testHelpers/shallowSetup';

import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  const defaultProps = {
    isLoading: false,
    onSubmit: () => {},
    onChange: () => {},
    searchText: '',
  };
  const setup = shallowSetup(SearchBar, defaultProps);

  it('renders the expected view', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the expected view when loading', () => {
    const { wrapper } = setup({ isLoading: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the expected view when search input has input', () => {
    const { wrapper } = setup({ searchText: 'coffee' });
    expect(wrapper).toMatchSnapshot();
  });
});
