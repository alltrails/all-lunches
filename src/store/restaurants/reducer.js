/* eslint-disable default-param-last */
import {
  UPDATE_FAVORITED_RESTAURANTS,
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
    case SET_SELECTED_RESTAURANT_ID:
      return {
        ...state,
        highlightedRestaurantId: payload,
      };
    case UPDATE_FAVORITED_RESTAURANTS.PENDING:
      return {
        ...state,
        isUpdatingFavorites: true,
      };
    case UPDATE_FAVORITED_RESTAURANTS.ERROR:
      return {
        ...state,
        isUpdatingFavorites: false,
      };
    case UPDATE_FAVORITED_RESTAURANTS.SUCCESS:
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
