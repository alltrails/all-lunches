/* eslint-env jest */

import shallowSetup from 'lib/testHelpers/shallowSetup';
import { restaurantsMock } from '__mocks__';

import { SidePanelContainer } from '../index';
import SidePanel from '../SidePanel';

describe('SidePanelContainer', () => {
  const defaultProps = {
    setFavoritedRestaurants: () => {},
    favoritedItemIds: [],
    highlightedRestaurantId: null,
    isUpdatingFavorites: false,
    restaurants: restaurantsMock,
    setSelectedRestaurantId: () => {},
  };
  const setup = shallowSetup(SidePanelContainer, defaultProps);

  it('renders the expected view', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the expected view when is updating favorites is true', () => {
    const { wrapper } = setup({ isUpdatingFavorites: true });
    expect(wrapper).toMatchSnapshot();
  });

  describe('Handling favorite item changes', () => {
    describe('When selected', () => {
      it('calls the setFavoritedRestaurants with the added item id when selected', () => {
        const { props, wrapper } = setup({ setFavoritedRestaurants: jest.fn() });
        const sidePanelComponent = wrapper.find(SidePanel);

        const itemId = 'some_item_id';

        sidePanelComponent.props().onFavoriteItemChange(itemId, false);

        expect(props.setFavoritedRestaurants).toBeCalledWith([itemId]);
      });

      it('calls the setFavoritedRestaurants with previous item ids selected and the new added item id when selected', () => {
        const { props, wrapper } = setup({
          favoritedItemIds: ['another_item_id'],
          setFavoritedRestaurants: jest.fn(),
        });
        const sidePanelComponent = wrapper.find(SidePanel);

        const itemId = 'some_item_id';
        sidePanelComponent.props().onFavoriteItemChange(itemId, false);

        expect(props.setFavoritedRestaurants).toBeCalledWith([...props.favoritedItemIds, itemId]);
      });
    });

    describe('When un-selecting', () => {
      it('calls the setFavoritedRestaurants with the previous item unselected', () => {
        const { props, wrapper } = setup({
          favoritedItemIds: ['another_item_id'],
          setFavoritedRestaurants: jest.fn(),
        });
        const sidePanelComponent = wrapper.find(SidePanel);

        const itemId = 'another_item_id';
        sidePanelComponent.props().onFavoriteItemChange(itemId, true);

        expect(props.setFavoritedRestaurants).toBeCalledWith([]);
      });
    });
  });

  describe('Handling mouse events', () => {
    it('calls the setSelectedRestaurantId with the item id when mouse hovers over item', () => {
      const { props, wrapper } = setup({ setSelectedRestaurantId: jest.fn() });
      const sidePanelComponent = wrapper.find(SidePanel);

      const hoveredItemId = 'some_item_id';

      sidePanelComponent.props().onMouseEnter(hoveredItemId);

      jest.runAllTimers();

      expect(props.setSelectedRestaurantId).toBeCalledWith(hoveredItemId);
    });

    it('calls the setSelectedRestaurantId when mouse hovers outside of an item', () => {
      const { props, wrapper } = setup({ setSelectedRestaurantId: jest.fn() });
      const sidePanelComponent = wrapper.find(SidePanel);

      sidePanelComponent.props().onMouseLeave();
      expect(props.setSelectedRestaurantId).toBeCalled();
    });
  });
});
