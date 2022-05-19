/* eslint-env jest */

import * as types from '../actions';
import reducer, { INITIAL_STATE } from '../reducer';

describe('Reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toMatchSnapshot();
  });

  describe('SET_USER_AGENT', () => {
    it('works as expected when there is device type', () => {
      const payload = {
        userAgent: {
          device: {
            vendor: 'Apple',
            device: 'mobile',
          },
        },
      };

      expect(
        reducer(INITIAL_STATE, {
          payload,
          type: types.SET_USER_AGENT,
        }),
      ).toMatchSnapshot();
    });
  });
});
