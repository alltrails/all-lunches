/* eslint-disable default-param-last */

import { TOGGLE_OPEN_TOAST } from 'store/ui/actions';
import { QUERY_AREA } from 'store/restaurants/actions';

export const INITIAL_STATE = {
  currentOpenToast: null,
};

const successToastMessages = {
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
    case QUERY_AREA.SUCCESS:
      return {
        ...state,
        currentOpenToast: successToastMessages[type],
      };
    case QUERY_AREA.ERROR:
      return {
        ...state,
        currentOpenToast: { message: payload, type: 'error' },
      };
    default:
      return state;
  }
};
