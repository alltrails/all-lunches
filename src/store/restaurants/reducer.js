/* eslint-disable default-param-last */
import {
  ADD_FAVORITED_RESTAURANT,
  FETCH_FAVORITED_RESTAURANTS,
  QUERY_AREA,
  SET_FILTER_OPTION,
  SET_SELECTED_RESTAURANT_ID,
} from './actions';

export const INITIAL_STATE = {
  favoritedItemIds: [],
  highlightedRestaurantId: null,
  isLoading: false,
  isUpdatingFavorites: false,
  restaurants: null,
  selectedFilterOption: null,
};

export default (state = INITIAL_STATE, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_FILTER_OPTION:
      return {
        ...state,
        selectedFilterOption: payload,
      };
    case ADD_FAVORITED_RESTAURANT.PENDING:
      return {
        ...state,
        isUpdatingFavorites: true,
      };
    case ADD_FAVORITED_RESTAURANT.ERROR:
      return {
        ...state,
        isUpdatingFavorites: false,
      };
    case ADD_FAVORITED_RESTAURANT.SUCCESS:
      return {
        ...state,
        favoritedItemIds: payload,
        isUpdatingFavorites: false,
      };
    case FETCH_FAVORITED_RESTAURANTS.SUCCESS:
      return {
        ...state,
        favoritedItemIds: payload,
      };
    case SET_SELECTED_RESTAURANT_ID:
      return {
        ...state,
        highlightedRestaurantId: payload,
      };
    case QUERY_AREA.PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case QUERY_AREA.ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case QUERY_AREA.SUCCESS:
      return {
        ...state,
        isLoading: false,
        restaurants: payload,
      };
    default:
      return state;
  }
};
