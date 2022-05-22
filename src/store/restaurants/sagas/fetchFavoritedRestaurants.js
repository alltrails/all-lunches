import Debug from 'debug';
import { call, put, takeLatest } from 'redux-saga/effects';

import { fetchDoc, getFirebaseDB, getFirebaseDoc } from 'lib/firebaseHelpers';

import { FETCH_FAVORITED_RESTAURANTS, fetchFavoritedRestaurants } from '../actions';

const debug = Debug('all-lunches:store:user:sagas:fetchFavoritedRestaurants');

export function* fetchFavoritedRestaurantsSaga({ payload: userId }) {
  debug('Saga called', userId);

  try {
    const db = yield call(getFirebaseDB);

    const restaurantUserRef = yield call(getFirebaseDoc, db, 'restaurants', userId);
    const docSnap = yield call(fetchDoc, restaurantUserRef);

    const data = docSnap.data();
    const favorites = data?.favorites || [];

    debug('Restaurant favorite user data fetched', favorites);

    yield put(fetchFavoritedRestaurants.success(favorites));
  } catch (e) {
    debug('Saga error', e);

    yield put(fetchFavoritedRestaurants.error(e.message));
  }
}

export default function* () {
  yield takeLatest(FETCH_FAVORITED_RESTAURANTS.PENDING, fetchFavoritedRestaurantsSaga);
}
