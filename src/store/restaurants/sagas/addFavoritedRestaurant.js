import Debug from 'debug';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { setDoc, doc, getFirestore } from 'firebase/firestore';

import { userIdSelector } from 'store/user/selectors';
import { ADD_FAVORITED_RESTAURANT, addFavoritedRestaurant } from '../actions';

const debug = Debug('all-lunches:store:map:sagas:addFavoritedRestaurant');

export function* addFavoritedRestaurantSaga({ payload: favoritedIds }) {
  debug('Saga called', favoritedIds);

  try {
    const userId = yield select(userIdSelector);
    const db = getFirestore();

    const userRef = doc(db, 'restaurants', userId);
    yield call(setDoc, userRef, {
      favorites: favoritedIds,
    });

    debug('Restaurant successfully added');

    yield put(addFavoritedRestaurant.success(favoritedIds));
  } catch (e) {
    debug('Saga error', e);

    yield put(addFavoritedRestaurant.error(e.message));
  }
}

export default function* () {
  yield takeLatest(ADD_FAVORITED_RESTAURANT.PENDING, addFavoritedRestaurantSaga);
}
