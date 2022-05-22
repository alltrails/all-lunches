import Debug from 'debug';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { postDoc, getFirebaseDB, getFirebaseDoc } from 'lib/firebaseHelpers';

import { userIdSelector } from 'store/user/selectors';
import { UPDATE_FAVORITED_RESTAURANTS, updateFavoritedRestaurants } from '../actions';

const debug = Debug('all-lunches:store:map:sagas:updateFavoritedRestaurants');

export function* updateFavoritedRestaurantsSaga({ payload: favoritedIds }) {
  debug('Saga called', favoritedIds);

  const userId = yield select(userIdSelector);

  try {
    const db = yield call(getFirebaseDB);

    const ref = yield call(getFirebaseDoc, db, 'restaurants', userId);
    yield call(postDoc, ref, {
      favorites: favoritedIds,
    });

    debug('Restaurant successfully added');

    yield put(updateFavoritedRestaurants.success(favoritedIds));
  } catch (e) {
    debug('Saga error', e);

    yield put(updateFavoritedRestaurants.error(e.message));
  }
}

export default function* () {
  yield takeLatest(UPDATE_FAVORITED_RESTAURANTS.PENDING, updateFavoritedRestaurantsSaga);
}
