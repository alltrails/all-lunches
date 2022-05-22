/* eslint-env jest */

import shallowSetup from 'lib/testHelpers/shallowSetup';
import { restaurantsMock } from '__mocks__';

import SidePanel from '../SidePanel';

describe('SidePanel', () => {
  const defaultProps = {
    favoritedItemIds: [],
    highlightedRestaurantId: null,
    isUpdatingFavorites: false,
    onFavoriteItemChange: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    restaurants: restaurantsMock,
  };
  const setup = shallowSetup(SidePanel, defaultProps);

  it('renders the expected view', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the expected view when updating favorites', () => {
    const { wrapper } = setup({ isUpdatingFavorites: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the expected view when the first item is favorited', () => {
    const { wrapper } = setup({ favoritedItemIds: [restaurantsMock[0].id] });
    expect(wrapper).toMatchSnapshot();
  });
});
