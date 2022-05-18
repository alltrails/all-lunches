import { createAction, createAsyncAction, createAsyncTypes } from 'lib/reduxUtils';

// Sync
export const SET_SELECTED_RESTAURANT_ID = 'restaurants/setSelectedRestaurantId';
export const setSelectedRestaurantId = createAction(SET_SELECTED_RESTAURANT_ID);

export const SET_FILTER_OPTION = 'restaurants/setFilterOption';
export const setFilterOption = createAction(SET_FILTER_OPTION);

// Async
export const QUERY_AREA = createAsyncTypes('restaurants/queryArea');
export const queryArea = createAsyncAction(QUERY_AREA);

export const ADD_FAVORITED_RESTAURANT = createAsyncTypes('restaurants/addFavoritedRestaurant');
export const addFavoritedRestaurant = createAsyncAction(ADD_FAVORITED_RESTAURANT);

export const FETCH_FAVORITED_RESTAURANTS = createAsyncTypes(
  'restaurants/fetchFavoritedRestaurants',
);
export const fetchFavoritedRestaurants = createAsyncAction(FETCH_FAVORITED_RESTAURANTS);
