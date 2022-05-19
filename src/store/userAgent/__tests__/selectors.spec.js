/* eslint-env jest */

import { DESKTOP, MOBILE, TABLET } from 'constants/deviceTypes';

import {
  deviceTypeOverridesByModel,
  uaDeviceTypeSelector,
} from '../selectors';

describe('User agent selectors', () => {
  describe('uaDeviceTypeSelector', () => {
    it('returns the user agent device type if it is defined', () => {
      const testState = {
        userAgent: {
          device: {
            type: MOBILE,
          },
        },
      };

      expect(uaDeviceTypeSelector(testState)).toEqual(MOBILE);
    });

    it('returns desktop if the user agent device is undefined', () => {
      const testState = {
        userAgent: {},
      };

      expect(uaDeviceTypeSelector(testState)).toEqual(DESKTOP);
    });

    it('returns desktop if the user agent device type is undefined', () => {
      const testState = {
        userAgent: {
          device: {},
        },
      };

      expect(uaDeviceTypeSelector(testState)).toEqual(DESKTOP);
    });

    it('returns the device type override if an override exists', () => {
      const testState = {
        userAgent: {
          device: {
            type: MOBILE,
          },
          deviceTypeOverride: TABLET,
        },
      };

      expect(uaDeviceTypeSelector(testState)).toEqual(TABLET);
    });

    it('returns the device type specified by the device model if an override for the model exists', () => {
      const modelOverride = Object.entries(deviceTypeOverridesByModel)[0];
      const testState = {
        userAgent: {
          device: {
            model: modelOverride[0],
            type: MOBILE,
          },
        },
      };

      expect(uaDeviceTypeSelector(testState)).toEqual(modelOverride[1]);
    });
  });
});
