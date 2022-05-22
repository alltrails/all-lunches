/* eslint-env jest */

import { call, put, takeLatest } from 'redux-saga/effects';

import { fetchDoc, getFirebaseDB, getFirebaseDoc } from 'lib/firebaseHelpers';

import { FETCH_FAVORITED_RESTAURANTS, fetchFavoritedRestaurants } from 'store/restaurants/actions';

import fetchFavoritedRestaurantsDefault, {
  fetchFavoritedRestaurantsSaga,
} from '../fetchFavoritedRestaurants';

describe('Saga: fetchFavoritedRestaurants', () => {
  const action = { payload: 'some_user_id' };
  const db = {};
  const restaurantUserRef = {};
  const result = ['some_restaurant_id'];
  const response = {
    data: () => ({
      favorites: ['some_restaurant_id'],
    }),
  };

  it('listens to actions', () => {
    const generator = fetchFavoritedRestaurantsDefault();
    expect(generator.next().value).toEqual(
      takeLatest(FETCH_FAVORITED_RESTAURANTS.PENDING, fetchFavoritedRestaurantsSaga),
    );
    expect(generator.next().done).toBe(true);
  });

  it('handles exceptions', () => {
    const fetchError = new Error('Some error happened');
    const generator = fetchFavoritedRestaurantsSaga(action);

    expect(generator.next().value).toEqual(call(getFirebaseDB));
    expect(generator.next(db).value).toEqual(
      call(getFirebaseDoc, db, 'restaurants', 'some_user_id'),
    );
    expect(generator.next(restaurantUserRef).value).toEqual(call(fetchDoc, restaurantUserRef));
    expect(generator.throw(fetchError).value).toEqual(
      put(fetchFavoritedRestaurants.error('Some error happened')),
    );
    expect(generator.next().done).toBe(true);
  });

  describe('Functions as expected', () => {
    const generator = fetchFavoritedRestaurantsSaga(action);

    it('sets up firebase reference', () => {
      expect(generator.next().value).toEqual(call(getFirebaseDB));
      expect(generator.next(db).value).toEqual(
        call(getFirebaseDoc, db, 'restaurants', 'some_user_id'),
      );
    });

    it('fetches user doc', () => {
      expect(generator.next(restaurantUserRef).value).toEqual(call(fetchDoc, restaurantUserRef));
    });

    it('dispatches the success action', () => {
      expect(generator.next(response).value).toEqual(
        put(fetchFavoritedRestaurants.success(result)),
      );
      expect(generator.next().done).toBe(true);
    });
  });
});
