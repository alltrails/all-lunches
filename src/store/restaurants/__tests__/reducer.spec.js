/* eslint-env jest */
import { restaurantsMock } from '__mocks__';
import * as types from '../actions';
import reducer, { INITIAL_STATE } from '../reducer';

describe('Restaurants reducer', () => {
  const isLoadingState = {
    ...INITIAL_STATE,
    isLoading: true,
  };

  const isUpdatingFavoritesState = {
    ...INITIAL_STATE,
    isUpdatingFavorites: true,
  };

  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toMatchSnapshot();
  });

  describe('SET_FILTER_OPTION', () => {
    it('works as expected', () => {
      const testPayload = 'high_to_low';

      expect(
        reducer(INITIAL_STATE, {
          payload: testPayload,
          type: types.SET_FILTER_OPTION,
        }),
      ).toMatchSnapshot();
    });
  });

  describe('SET_SELECTED_RESTAURANT_ID', () => {
    it('works as expected', () => {
      const testPayload = 'some_id';

      expect(
        reducer(INITIAL_STATE, {
          payload: testPayload,
          type: types.SET_SELECTED_RESTAURANT_ID,
        }),
      ).toMatchSnapshot();
    });
  });

  describe('UPDATE_FAVORITED_RESTAURANTS.PENDING', () => {
    it('works as expected', () => {
      expect(
        reducer(INITIAL_STATE, {
          type: types.UPDATE_FAVORITED_RESTAURANTS.PENDING,
        }),
      ).toMatchSnapshot();
    });
  });

  describe('UPDATE_FAVORITED_RESTAURANTS.SUCCESS', () => {
    it('works as expected', () => {
      const testPayload = ['some_id_1', 'some_id_2'];

      expect(
        reducer(isUpdatingFavoritesState, {
          payload: testPayload,
          type: types.UPDATE_FAVORITED_RESTAURANTS.SUCCESS,
        }),
      ).toMatchSnapshot();
    });

    it('works as expected when empty array', () => {
      const testPayload = [];

      expect(
        reducer(isUpdatingFavoritesState, {
          payload: testPayload,
          type: types.UPDATE_FAVORITED_RESTAURANTS.SUCCESS,
        }),
      ).toMatchSnapshot();
    });
  });

  describe('UPDATE_FAVORITED_RESTAURANTS.ERROR', () => {
    it('works as expected', () => {
      expect(
        reducer(isLoadingState, {
          payload: 'looks like there was an error',
          type: types.UPDATE_FAVORITED_RESTAURANTS.ERROR,
        }),
      ).toMatchSnapshot();
    });
  });

  describe('FETCH_FAVORITED_RESTAURANTS.SUCCESS', () => {
    it('works as expected', () => {
      const testPayload = ['some_id_1', 'some_id_2'];

      expect(
        reducer(isUpdatingFavoritesState, {
          payload: testPayload,
          type: types.FETCH_FAVORITED_RESTAURANTS.SUCCESS,
        }),
      ).toMatchSnapshot();
    });

    it('works as expected when empty array', () => {
      const testPayload = [];

      expect(
        reducer(isUpdatingFavoritesState, {
          payload: testPayload,
          type: types.FETCH_FAVORITED_RESTAURANTS.SUCCESS,
        }),
      ).toMatchSnapshot();
    });
  });

  describe('QUERY_AREA.PENDING', () => {
    it('works as expected', () => {
      expect(
        reducer(INITIAL_STATE, {
          type: types.QUERY_AREA.PENDING,
        }),
      ).toMatchSnapshot();
    });
  });

  describe('QUERY_AREA.SUCCESS', () => {
    it('works as expected', () => {
      const testPayload = restaurantsMock;

      expect(
        reducer(isLoadingState, {
          payload: testPayload,
          type: types.QUERY_AREA.SUCCESS,
        }),
      ).toMatchSnapshot();
    });
  });

  describe('QUERY_AREA.ERROR', () => {
    it('works as expected', () => {
      expect(
        reducer(isLoadingState, {
          payload: 'looks like there was an error',
          type: types.QUERY_AREA.ERROR,
        }),
      ).toMatchSnapshot();
    });
  });
});
