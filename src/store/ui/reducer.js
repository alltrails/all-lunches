/* eslint-disable default-param-last */

import { TOGGLE_OPEN_TOAST } from 'store/ui/actions';
import { QUERY_AREA, UPDATE_FAVORITED_RESTAURANTS } from 'store/restaurants/actions';

export const INITIAL_STATE = {
  currentOpenToast: null,
};

const successToastMessages = {
  [UPDATE_FAVORITED_RESTAURANTS.SUCCESS]: {
    message: 'Successfully added your favorite restaurant!',
    type: 'success',
  },
  [QUERY_AREA.SUCCESS]: { message: 'Successfully fetched restaurants!', type: 'success' },
};

export default (state = INITIAL_STATE, action) => {
  const { payload, type } = action;

  switch (type) {
    case TOGGLE_OPEN_TOAST:
      return {
        ...state,
        currentOpenToast: payload,
      };
    case UPDATE_FAVORITED_RESTAURANTS.PENDING:
    case QUERY_AREA.PENDING:
      return {
        ...state,
        currentOpenToast: null,
      };
    case UPDATE_FAVORITED_RESTAURANTS.SUCCESS:
    case QUERY_AREA.SUCCESS:
      return {
        ...state,
        currentOpenToast: successToastMessages[type],
      };
    case UPDATE_FAVORITED_RESTAURANTS.ERROR:
    case QUERY_AREA.ERROR:
      return {
        ...state,
        currentOpenToast: { message: payload, type: 'error' },
      };
    default:
      return state;
  }
};
