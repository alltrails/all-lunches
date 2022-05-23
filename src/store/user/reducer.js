/* eslint-disable @typescript-eslint/default-param-last */
import { VALIDATE_USER } from './actions';

export const INITIAL_STATE = {
  user: null,
};

export default (state = INITIAL_STATE, action) => {
  const { payload, type } = action;

  switch (type) {
    case VALIDATE_USER.SUCCESS:
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
};
