/* eslint-env jest */
import * as types from '../actions';
import reducer, { INITIAL_STATE } from '../reducer';

describe('User reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toMatchSnapshot();
  });

  describe('VALIDATE_USER.SUCCESS', () => {
    it('works as expected', () => {
      const testPayload = {
        userId: '123',
        isAnonymous: true,
      };

      expect(
        reducer(INITIAL_STATE, {
          payload: testPayload,
          type: types.VALIDATE_USER.SUCCESS,
        }),
      ).toMatchSnapshot();
    });
  });
});
