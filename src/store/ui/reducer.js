/* eslint-disable default-param-last */

import { TOGGLE_OPEN_TOAST } from 'store/ui/actions';
import { ADD_REPORT } from 'store/map/actions';
import { INITIALIZE_APPLICATION } from 'store/app/actions';

export const INITIAL_STATE = {
  currentOpenModals: null,
};

const successToastMessages = {
  // [LOGIN_VERIFY_CODE.SUCCESS]: { message: 'You have successfully logged in', type: 'success' },
  // [SIGNUP_VERIFY_CODE.SUCCESS]: { message: 'You have successfully signed up', type: 'success' },
  // [SIGN_OUT.SUCCESS]: { message: 'You have successfully signed out', type: 'success' },
};

export default (state = INITIAL_STATE, action) => {
  const { payload, type } = action;

  switch (type) {
    case TOGGLE_OPEN_TOAST:
      return {
        ...state,
        currentOpenToast: payload,
      };
    case ADD_REPORT.ERROR:
    case INITIALIZE_APPLICATION.ERROR:
      return {
        ...state,
        currentOpenToast: { message: payload, type: 'error' },
      };
    default:
      return state;
  }
};
