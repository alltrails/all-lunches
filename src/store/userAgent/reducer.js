/* eslint-disable default-param-last */
import { MOBILE, TABLET } from 'constants/deviceTypes';

import { SET_USER_AGENT } from './actions';

// Mapping query param value to device type
const deviceTypeOverrideMap = {
  m: MOBILE,
  t: TABLET,
};

export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case SET_USER_AGENT: {
      const { deviceTypeOverride, userAgent } = payload;
      return {
        ...state,
        ...userAgent,
        deviceTypeOverride: deviceTypeOverrideMap[deviceTypeOverride] || null,
      };
    }
    default:
      return state;
  }
};
