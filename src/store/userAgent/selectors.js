import { createSelector } from 'reselect';
import { DESKTOP, MOBILE, TABLET } from 'constants/deviceTypes';

export const userAgentSelector = state => state.userAgent;
export const deviceTypeOverrideSelector = state => state.userAgent.deviceTypeOverride;
export const uaBrowserSelector = state => state.userAgent.browser;
export const uaDeviceSelector = state => state.userAgent.device;
export const uaOSNameSelector = state => state.userAgent.os && state.userAgent.os.name;
export const uaOSVersionSelector = state => state.userAgent.os && state.userAgent.os.version;

export const isIESelector = state => state.userAgent.browser && state.userAgent.browser.name === 'IE';
export const isEdgeSelector = state => state.userAgent.browser && state.userAgent.browser.name === 'Edge';
export const isChromeSelector = state => state.userAgent.browser && state.userAgent.browser.name === 'Chrome';

export const isIOSSelector = state => state.userAgent.os && state.userAgent.os.name === 'iOS';

export const isIOSChromeSelector = state => isIOSSelector(state) && isChromeSelector(state);

export const isAndroidSelector = state => state.userAgent
  && state.userAgent.os && state.userAgent.os.name === 'Android';

// These are devices whose device types we have found to be incorrectly parsed by ua-parser-js
export const deviceTypeOverridesByModel = {
  'TB-X304F': TABLET,
};

export const uaDeviceTypeSelector = createSelector(
  uaDeviceSelector,
  deviceTypeOverrideSelector,
  (device, deviceTypeOverride) => {
    if (deviceTypeOverride) return deviceTypeOverride;
    if (!device) return DESKTOP;

    return deviceTypeOverridesByModel[device.model] || device.type || DESKTOP;
  },
);

export const isTouchScreenSelector = createSelector(
  uaDeviceTypeSelector,
  deviceType => deviceType && (deviceType === MOBILE || deviceType === TABLET),
);

export const isMobileDeviceSelector = createSelector(
  uaDeviceTypeSelector,
  deviceType => deviceType && deviceType === MOBILE,
);

export const isWindows7Selector = createSelector(
  uaOSNameSelector,
  uaOSVersionSelector,
  (uaOSName, uaOSVersion) => uaOSName === 'Windows' && uaOSVersion === '7',
);
