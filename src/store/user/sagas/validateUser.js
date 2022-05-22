/* eslint-disable prefer-promise-reject-errors */
import Debug from 'debug';
import { call, put, takeLatest } from 'redux-saga/effects';

import awaitAsyncAction from 'lib/awaitAsyncAction';
import {
  getAuthentication,
  handleAuthenticationStateChange,
  initializeApplicationCheck,
  signUserInAnonymously,
  setUserLocalPersistence,
} from 'lib/firebaseHelpers';

import { fetchFavoritedRestaurants, FETCH_FAVORITED_RESTAURANTS } from 'store/restaurants/actions';
import { VALIDATE_USER, validateUser } from '../actions';

const debug = Debug('all-lunches:store:user:sagas:validateUser');

export function* validateUserSaga({ payload: app }) {
  debug('Saga called');

  try {
    yield call(initializeApplicationCheck, app);

    debug('App check passed');

    const auth = yield call(getAuthentication);
    let user = yield call(handleAuthenticationStateChange, auth, debug);

    if (user) {
      yield put(fetchFavoritedRestaurants(user.uid));
      const [, errorAction] = yield call(awaitAsyncAction, FETCH_FAVORITED_RESTAURANTS);

      if (errorAction) {
        const { payload: error } = errorAction;
        if (error) throw error;
      }
    } else {
      ({ user } = yield call(signUserInAnonymously, auth));
      yield call(setUserLocalPersistence, auth);

      debug('Logged in anonymously', user);
    }

    yield put(validateUser.success(user));
  } catch (e) {
    debug('Saga error', e);
    yield put(validateUser.error(e.message));
  }
}

export default function* () {
  yield takeLatest(VALIDATE_USER.PENDING, validateUserSaga);
}
