/* eslint-env jest */

import shallowSetup from 'lib/testHelpers/shallowSetup';
import { restaurantMock } from '__mocks__';

import RestaurantDetails from '../index';

describe('RestaurantDetails', () => {
  const defaultProps = {};
  const setup = shallowSetup(RestaurantDetails, defaultProps);

  it('renders the expected view when no properties exist', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the expected view when all properties exist', () => {
    const { wrapper } = setup({
      name: restaurantMock.name,
      photoUrl: restaurantMock.photoUrl,
      placeUrl: restaurantMock.placeUrl,
      priceLevel: restaurantMock.priceLevel,
      rating: restaurantMock.rating,
      supportingText: restaurantMock.supportingText,
      userRatingsTotal: restaurantMock.userRatingsTotal,
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the expected view when price level is high', () => {
    const { wrapper } = setup({
      name: restaurantMock.name,
      photoUrl: restaurantMock.photoUrl,
      placeUrl: restaurantMock.placeUrl,
      priceLevel: 5,
      rating: restaurantMock.rating,
      supportingText: restaurantMock.supportingText,
      userRatingsTotal: restaurantMock.userRatingsTotal,
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the expected view when rating level is low', () => {
    const { wrapper } = setup({
      name: restaurantMock.name,
      photoUrl: restaurantMock.photoUrl,
      placeUrl: restaurantMock.placeUrl,
      priceLevel: restaurantMock.priceLevel,
      rating: 0,
      supportingText: restaurantMock.supportingText,
      userRatingsTotal: restaurantMock.userRatingsTotal,
    });
    expect(wrapper).toMatchSnapshot();
  });
});
