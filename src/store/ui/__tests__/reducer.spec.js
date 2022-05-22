/* eslint-env jest */
import * as restaurantsActions from 'store/restaurants/actions';
import * as types from '../actions';

import reducer, { INITIAL_STATE } from '../reducer';

describe('UI reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toMatchSnapshot();
  });

  describe('TOGGLE_OPEN_TOAST', () => {
    it('works as expected', () => {
      const testPayload = {
        message: 'Oops, something went wrong',
        type: 'error',
      };

      expect(
        reducer(INITIAL_STATE, {
          payload: testPayload,
          type: types.TOGGLE_OPEN_TOAST,
        }),
      ).toMatchSnapshot();
    });
  });

  describe('QUERY_AREA.PENDING', () => {
    it('works as expected', () => {
      const testState = {
        ...INITIAL_STATE,
        currentOpenToast: {
          message: 'Oops, something went wrong',
          type: 'error',
        },
      };

      expect(
        reducer(testState, {
          type: restaurantsActions.QUERY_AREA.PENDING,
        }),
      ).toMatchSnapshot();
    });
  });

  describe('UPDATE_FAVORITED_RESTAURANTS.PENDING', () => {
    it('works as expected', () => {
      const testState = {
        ...INITIAL_STATE,
        currentOpenToast: {
          message: 'Oops, something went wrong',
          type: 'error',
        },
      };

      expect(
        reducer(testState, {
          type: restaurantsActions.UPDATE_FAVORITED_RESTAURANTS.PENDING,
        }),
      ).toMatchSnapshot();
    });
  });

  describe('QUERY_AREA.SUCCESS', () => {
    it('works as expected', () => {
      expect(
        reducer(INITIAL_STATE, {
          type: restaurantsActions.QUERY_AREA.SUCCESS,
        }),
      ).toMatchSnapshot();
    });
  });

  describe('UPDATE_FAVORITED_RESTAURANTS.SUCCESS', () => {
    it('works as expected', () => {
      expect(
        reducer(INITIAL_STATE, {
          type: restaurantsActions.UPDATE_FAVORITED_RESTAURANTS.SUCCESS,
        }),
      ).toMatchSnapshot();
    });
  });

  describe('QUERY_AREA.ERROR', () => {
    it('works as expected', () => {
      const testPayload = 'Something went wrong';

      expect(
        reducer(INITIAL_STATE, {
          payload: testPayload,
          type: restaurantsActions.QUERY_AREA.ERROR,
        }),
      ).toMatchSnapshot();
    });
  });

  describe('UPDATE_FAVORITED_RESTAURANTS.ERROR', () => {
    it('works as expected', () => {
      const testPayload = 'Something went wrong';

      expect(
        reducer(INITIAL_STATE, {
          payload: testPayload,
          type: restaurantsActions.UPDATE_FAVORITED_RESTAURANTS.ERROR,
        }),
      ).toMatchSnapshot();
    });
  });
});
