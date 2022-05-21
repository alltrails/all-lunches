/* eslint-env jest */
/**
 * @jest-environment jsdom
 */

import shallowSetup from 'lib/testHelpers/shallowSetup';
import { withHooks } from 'jest-react-hooks-shallow';
import { reactRefMock } from '__mocks__';

import * as FilterTypes from 'constants/filterTypes';

import FilterMenuContainer from '../index';
import FilterMenu from '../FilterMenu';

describe('FilterMenuContainer', () => {
  const defaultProps = {
    filterButtonRef: reactRefMock,
    onClose: () => {},
    onMenuOptionClick: () => {},
    onSubmit: () => {},
    selectedMenuOption: null,
  };
  const setup = shallowSetup(FilterMenuContainer, defaultProps);

  it('renders the expected view', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the expected view with a selected menu option', () => {
    const { wrapper } = setup({ selectedMenuOption: FilterTypes.HIGH_TO_LOW_FILTER_OPTION });
    expect(wrapper).toMatchSnapshot();
  });

  it('calls the onMenuOptionClick function prop with the selected menu option', () => {
    const { props, wrapper } = setup({ onMenuOptionClick: jest.fn() });

    const filterMenuComponent = wrapper.find(FilterMenu);
    filterMenuComponent.props().onMenuOptionClick();

    expect(props.onMenuOptionClick).toBeCalled();
  });

  it('calls the onSubmit function prop with the selected menu option', () => {
    const { props, wrapper } = setup({ onSubmit: jest.fn() });

    const filterMenuComponent = wrapper.find(FilterMenu);
    filterMenuComponent.props().onSubmit();

    expect(props.onSubmit).toBeCalled();
  });

  describe('Handling mousedown events', () => {
    const mousedownEvent = { target: {} };
    let eventListeners;

    beforeEach(() => {
      eventListeners = {};
      window.addEventListener = jest.fn((event, cb) => {
        eventListeners[event] = cb;
      });
      window.removeEventListener = jest.fn();
    });

    it('calls the onClose function prop when target is outside of menu or filter button', () => {
      withHooks(() => {
        const { props } = setup({ onClose: jest.fn() });
        eventListeners.mousedown(mousedownEvent);

        expect(props.onClose).toBeCalled();
      });
    });
  });
});
