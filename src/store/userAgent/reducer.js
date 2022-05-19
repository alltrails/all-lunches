/* eslint-disable default-param-last */
import { SET_USER_AGENT } from './actions';

export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case SET_USER_AGENT:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
