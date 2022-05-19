/* eslint-env jest */
import * as types from '../actions';
import reducer, { INITIAL_STATE } from '../reducer';

describe('App reducer', () => {
  const isLoadingState = {
    ...INITIAL_STATE,
    isLoading: true,
  };

  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toMatchSnapshot();
  });

  describe('INITIALIZE_APPLICATION.PENDING', () => {
    it('works as expected', () => {
      expect(
        reducer(INITIAL_STATE, {
          type: types.INITIALIZE_APPLICATION.PENDING,
        }),
      ).toMatchSnapshot();
    });
  });

  describe('INITIALIZE_APPLICATION.SUCCESS', () => {
    it('works as expected', () => {
      expect(
        reducer(isLoadingState, {
          type: types.INITIALIZE_APPLICATION.SUCCESS,
        }),
      ).toMatchSnapshot();
    });
  });

  describe('INITIALIZE_APPLICATION.ERROR', () => {
    it('works as expected', () => {
      expect(
        reducer(isLoadingState, {
          payload: 'looks like there was an error',
          type: types.INITIALIZE_APPLICATION.ERROR,
        }),
      ).toMatchSnapshot();
    });
  });
});
