import { createAction, createAsyncAction, createAsyncTypes } from 'lib/reduxUtils';

// Sync
export const SET_HIGHLIGHTED_RESTAURANT_ID = 'restaurants/setHighlightedRestaurantId';
export const setHighlightedRestaurantId = createAction(SET_HIGHLIGHTED_RESTAURANT_ID);

export const SET_FILTER_OPTION = 'restaurants/setFilterOption';
export const setFilterOption = createAction(SET_FILTER_OPTION);

// Async
export const QUERY_AREA = createAsyncTypes('restaurants/queryArea');
export const queryArea = createAsyncAction(QUERY_AREA);

export const UPDATE_FAVORITED_RESTAURANTS = createAsyncTypes(
  'restaurants/updateFavoritedRestaurants',
);
export const updateFavoritedRestaurants = createAsyncAction(UPDATE_FAVORITED_RESTAURANTS);

export const FETCH_FAVORITED_RESTAURANTS = createAsyncTypes(
  'restaurants/fetchFavoritedRestaurants',
);
export const fetchFavoritedRestaurants = createAsyncAction(FETCH_FAVORITED_RESTAURANTS);
