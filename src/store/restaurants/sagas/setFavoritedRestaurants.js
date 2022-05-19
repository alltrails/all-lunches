import Debug from 'debug';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { setDoc, doc, getFirestore } from 'firebase/firestore';

import { userIdSelector } from 'store/user/selectors';
import { SET_FAVORITED_RESTAURANTS, setFavoritedRestaurants } from '../actions';

const debug = Debug('all-lunches:store:map:sagas:setFavoritedRestaurants');

export function* setFavoritedRestaurantsSaga({ payload: favoritedIds }) {
  debug('Saga called', favoritedIds);

  try {
    const userId = yield select(userIdSelector);
    const db = getFirestore();

    const userRef = doc(db, 'restaurants', userId);
    yield call(setDoc, userRef, {
      favorites: favoritedIds,
    });

    debug('Restaurant successfully added');

    yield put(setFavoritedRestaurants.success(favoritedIds));
  } catch (e) {
    debug('Saga error', e);

    yield put(setFavoritedRestaurants.error(e.message));
  }
}

export default function* () {
  yield takeLatest(SET_FAVORITED_RESTAURANTS.PENDING, setFavoritedRestaurantsSaga);
}
