/* eslint-disable default-param-last */

import { TOGGLE_OPEN_TOAST } from 'store/ui/actions';
import { QUERY_AREA, ADD_FAVORITED_RESTAURANT } from 'store/restaurants/actions';

export const INITIAL_STATE = {
  currentOpenToast: null,
};

const successToastMessages = {
  [ADD_FAVORITED_RESTAURANT.SUCCESS]: { message: 'Successfully added!', type: 'success' },
  [QUERY_AREA.SUCCESS]: { message: 'Successfully loaded!', type: 'success' },
};

export default (state = INITIAL_STATE, action) => {
  const { payload, type } = action;

  switch (type) {
    case TOGGLE_OPEN_TOAST:
      return {
        ...state,
        currentOpenToast: payload,
      };
    case QUERY_AREA.PENDING:
      return {
        ...state,
        currentOpenToast: null,
      };
    case ADD_FAVORITED_RESTAURANT.SUCCESS:
    case QUERY_AREA.SUCCESS:
      return {
        ...state,
        currentOpenToast: successToastMessages[type],
      };
    case ADD_FAVORITED_RESTAURANT.ERROR:
    case QUERY_AREA.ERROR:
      return {
        ...state,
        currentOpenToast: { message: payload, type: 'error' },
      };
    default:
      return state;
  }
};
