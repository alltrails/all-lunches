/* eslint-env jest */

import { call, put, select, takeLatest } from 'redux-saga/effects';

import { postDoc, getFirebaseDB, getFirebaseDoc } from 'lib/firebaseHelpers';

import { userIdSelector } from 'store/user/selectors';

import {
  UPDATE_FAVORITED_RESTAURANTS,
  updateFavoritedRestaurants,
} from 'store/restaurants/actions';

import updateFavoritedRestaurantsDefault, {
  updateFavoritedRestaurantsSaga,
} from '../updateFavoritedRestaurants';

describe('Saga: updateFavoritedRestaurants', () => {
  const favoriteIds = ['some_fav_restaurant_id'];
  const action = { payload: favoriteIds };
  const db = {};
  const ref = {};
  const data = { favorites: favoriteIds };
  const userId = 'some_user_id';

  it('listens to actions', () => {
    const generator = updateFavoritedRestaurantsDefault();
    expect(generator.next().value).toEqual(
      takeLatest(UPDATE_FAVORITED_RESTAURANTS.PENDING, updateFavoritedRestaurantsSaga),
    );
    expect(generator.next().done).toBe(true);
  });

  it('handles exceptions', () => {
    const fetchError = new Error('Some error happened');
    const generator = updateFavoritedRestaurantsSaga(action);

    expect(generator.next().value).toEqual(select(userIdSelector));
    expect(generator.next(userId).value).toEqual(call(getFirebaseDB));
    expect(generator.next(db).value).toEqual(call(getFirebaseDoc, db, 'restaurants', userId));
    expect(generator.next(ref).value).toEqual(call(postDoc, ref, data));
    expect(generator.throw(fetchError).value).toEqual(
      put(updateFavoritedRestaurants.error('Some error happened')),
    );
    expect(generator.next().done).toBe(true);
  });

  describe('Functions as expected', () => {
    const generator = updateFavoritedRestaurantsSaga(action);

    it('sets up firebase reference', () => {
      expect(generator.next().value).toEqual(select(userIdSelector));
      expect(generator.next(userId).value).toEqual(call(getFirebaseDB));
      expect(generator.next(db).value).toEqual(call(getFirebaseDoc, db, 'restaurants', userId));
    });

    it('posts favorite restaurants', () => {
      expect(generator.next(ref).value).toEqual(call(postDoc, ref, data));
    });

    it('dispatches the success action', () => {
      expect(generator.next().value).toEqual(put(updateFavoritedRestaurants.success(favoriteIds)));
      expect(generator.next().done).toBe(true);
    });
  });
});
