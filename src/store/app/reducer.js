/* eslint-disable @typescript-eslint/default-param-last */
import { INITIALIZE_APPLICATION } from './actions';

export const INITIAL_STATE = {
  error: null,
  isLoading: false,
};

export default (state = INITIAL_STATE, action) => {
  const { payload, type } = action;

  switch (type) {
    case INITIALIZE_APPLICATION.PENDING:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case INITIALIZE_APPLICATION.ERROR:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    case INITIALIZE_APPLICATION.SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
