/* eslint-env jest */

import shallowSetup from 'lib/testHelpers/shallowSetup';
import { createChangeEvent } from 'lib/testHelpers/util';

import SearchBar from '../SearchBar';
import { SearchBarContainer } from '../index';

describe('SearchBarContainer', () => {
  const defaultProps = {
    isLoading: false,
    queryArea: () => {},
  };
  const setup = shallowSetup(SearchBarContainer, defaultProps);
  const searchInputText = 'coffee';

  it('renders the expected view', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the expected view when loading', () => {
    const { wrapper } = setup({ isLoading: true });
    expect(wrapper).toMatchSnapshot();
  });

  describe('Handling input change', () => {
    it('updates the searchText prop of the child component', () => {
      const { wrapper } = setup();
      let searchBarComponent = wrapper.find(SearchBar);

      expect(searchBarComponent.prop('searchText')).toEqual('');

      searchBarComponent.props().onChange(createChangeEvent('searchText', searchInputText));
      searchBarComponent = wrapper.find(SearchBar);

      expect(searchBarComponent.prop('searchText')).toEqual(searchInputText);
    });
  });

  describe('Handling submit', () => {
    it("prevents the submit event's default behavior", () => {
      const { wrapper } = setup();
      const submitEvent = { preventDefault: jest.fn() };
      const searchBarComponent = wrapper.find(SearchBar);

      searchBarComponent.props().onSubmit(submitEvent);

      expect(submitEvent.preventDefault).toBeCalled();
    });

    it('calls the queryArea callback prop with the searchText value', () => {
      const { props, wrapper } = setup({
        queryArea: jest.fn(),
      });
      const submitEvent = { preventDefault: () => {} };
      let searchBarComponent = wrapper.find(SearchBar);
      searchBarComponent.props().onChange(createChangeEvent('searchText', searchInputText));

      searchBarComponent = wrapper.find(SearchBar);
      searchBarComponent.props().onSubmit(submitEvent);

      expect(props.queryArea).toBeCalledWith(searchInputText);
    });

    it('does not call the queryArea callback prop with an input value of empty spaces', () => {
      const { props, wrapper } = setup({
        queryArea: jest.fn(),
      });
      const submitEvent = { preventDefault: () => {} };
      let searchBarComponent = wrapper.find(SearchBar);
      searchBarComponent.props().onChange(createChangeEvent('searchText', '    '));

      searchBarComponent = wrapper.find(SearchBar);
      searchBarComponent.props().onSubmit(submitEvent);

      expect(props.queryArea).not.toBeCalled();
    });
  });
});
