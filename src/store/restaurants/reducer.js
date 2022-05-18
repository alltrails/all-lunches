/* eslint-disable default-param-last */
import { SET_FILTER_OPTION, SET_SELECTED_ITEM_ID, QUERY_AREA } from './actions';

export const INITIAL_STATE = {
  isLoading: false,
  restaurants: null,
  highlightedRestaurantId: null,
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
    case SET_SELECTED_ITEM_ID:
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
