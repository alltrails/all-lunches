import Debug from 'debug';
import { call, put, takeLatest } from 'redux-saga/effects';

import { doc, getDoc, getFirestore } from 'firebase/firestore';

import { FETCH_FAVORITED_RESTAURANTS, fetchFavoritedRestaurants } from '../actions';

const debug = Debug('all-lunches:store:user:sagas:fetchFavoritedRestaurants');

export function* fetchFavoritedRestaurantsSaga({ payload: userId }) {
  debug('Saga called', userId);

  try {
    const db = getFirestore();

    const restaurantUserRef = doc(db, 'restaurants', userId);
    const docSnap = yield call(getDoc, restaurantUserRef);

    let favorites = [];
    ({ favorites } = docSnap.data());

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
