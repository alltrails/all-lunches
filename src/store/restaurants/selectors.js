import { createSelector } from 'reselect';

import * as filterTypes from 'constants/filterTypes';

import preloadImage from 'lib/preloadImage';
import { toGeoJSONFeature } from 'lib/mapUtils';
import { generateGoogleMapsUrl, getPhotoUrl } from 'lib/restaurantsListUtils';

export const favoritedItemIdsSelector = (state) => state.restaurants.favoritedItemIds;
export const highlightedRestaurantIdSelector = (state) => state.restaurants.highlightedRestaurantId;
export const isLoadingSelector = (state) => state.restaurants.isLoading;
export const isUpdatingFavoritesSelector = (state) => state.restaurants.isUpdatingFavorites;
export const restaurantsSelector = (state) => state.restaurants.restaurants;
export const selectedFilterOptionSelector = (state) => state.restaurants.selectedFilterOption;

const operationalRestaurantsSelector = createSelector(restaurantsSelector, (restaurants) =>
  restaurants.filter((restaurant) => restaurant.businessStatus === 'OPERATIONAL'),
);

const generateRestaurantDetails = (result) => {
  const photoUrl = getPhotoUrl(result.photos);
  if (photoUrl) preloadImage(photoUrl);

  return {
    id: result.placeId,
    name: result.name,
    placeUrl: generateGoogleMapsUrl(result),
    rating: result.rating,
    userRatingsTotal: result.userRatingsTotal,
    priceLevel: result.priceLevel,
    photoUrl,
    supportingText: result.types[0].replace('_', ' '),
    coordinates: [result.geometry.location.lng(), result.geometry.location.lat()],
  };
};

export const restaurantsMapSelector = createSelector(
  operationalRestaurantsSelector,
  (restaurants) =>
    restaurants.map((result) => {
      const coordinates = [result.geometry.location.lng(), result.geometry.location.lat()];
      const properties = generateRestaurantDetails(result);

      const geoJSON = toGeoJSONFeature(coordinates, properties);
      return geoJSON;
    }),
);

export const restaurantsFilteredListSelector = createSelector(
  selectedFilterOptionSelector,
  operationalRestaurantsSelector,
  (selectedFilterOption, restaurantDetails) => {
    const restaurants = restaurantDetails.map((result) => generateRestaurantDetails(result));

    if (!selectedFilterOption) return restaurants;

    if (selectedFilterOption === filterTypes.HIGH_TO_LOW_FILTER_OPTION) {
      return restaurants.sort((a, b) => b.userRatingsTotal - a.userRatingsTotal);
    }

    return restaurants.sort((a, b) => a.userRatingsTotal - b.userRatingsTotal);
  },
);

export const highlightedRestaurantSelector = createSelector(
  restaurantsFilteredListSelector,
  highlightedRestaurantIdSelector,
  (restaurantItems, restaurantId) =>
    restaurantId && restaurantItems.filter((item) => item.id === restaurantId),
);
