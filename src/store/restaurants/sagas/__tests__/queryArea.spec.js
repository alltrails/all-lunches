/* eslint-env jest */

import { call, put, takeLatest } from 'redux-saga/effects';

import { fetchDoc, getFirebaseDB, getFirebaseDoc } from 'lib/firebaseHelpers';

import { QUERY_AREA, queryArea } from 'store/restaurants/actions';

import queryAreaDefault, { queryAreaSaga } from '../queryArea';

describe('Saga: queryArea', () => {
  const action = { payload: 'some_user_id' };
  const db = {};
  const restaurantUserRef = {};
  const restaurantData = { restaurant: ['some_restaurant_id'] };
  const response = () => ({ data: () => restaurantData });

  it('listens to actions', () => {
    const generator = queryAreaDefault();
    expect(generator.next().value).toEqual(takeLatest(QUERY_AREA.PENDING, queryAreaSaga));
    expect(generator.next().done).toBe(true);
  });

  it('handles exceptions', () => {
    const fetchError = new Error('Some error happened');
    const generator = queryAreaSaga(action);

    expect(generator.next().value).toEqual(call(getFirebaseDB));
    expect(generator.next(db).value).toEqual(
      call(getFirebaseDoc, db, 'restaurants', 'some_user_id'),
    );
    expect(generator.next(restaurantUserRef).value).toEqual(call(fetchDoc, restaurantUserRef));
    expect(generator.throw(fetchError).value).toEqual(put(queryArea.error(fetchError, action)));
    expect(generator.next().done).toBe(true);
  });

  describe('Functions as expected', () => {
    const generator = queryAreaSaga(action);

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
      expect(generator.next(response).value).toEqual(put(queryArea.success(restaurantData)));
      expect(generator.next().done).toBe(true);
    });
  });
});
