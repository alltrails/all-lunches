import { createSelector } from 'reselect';
import { MOBILE, TABLET } from 'constants/deviceTypes';

export const uaDeviceSelector = (state) => state.userAgent.device;

export const isTouchScreenSelector = createSelector(
  uaDeviceSelector,
  (deviceType) => deviceType && (deviceType === MOBILE || deviceType === TABLET),
);
