/* eslint-disable prefer-promise-reject-errors */
import Debug from 'debug';
import { call, put, takeLatest } from 'redux-saga/effects';
import Config from 'config'; // eslint-disable-line

import awaitAsyncAction from 'lib/awaitAsyncAction';

import {
  getAuth,
  signInAnonymously,
  browserLocalPersistence,
  setPersistence,
  onAuthStateChanged,
} from 'firebase/auth';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

import { fetchFavoritedRestaurants, FETCH_FAVORITED_RESTAURANTS } from 'store/restaurants/actions';
import { VALIDATE_USER, validateUser } from '../actions';

const debug = Debug('all-lunches:store:user:sagas:validateUser');

const handleAuthChangeState = (auth) =>
  new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      debug('User', user);

      if (user && !user.stsTokenManager.isExpired) resolve(user);
      else resolve(null);
    });
  });

export function* validateUserSaga({ payload: app }) {
  debug('Saga called');

  try {
    yield call(initializeAppCheck, app, {
      // Optional argument. If true, the SDK automatically refreshes App Check
      // tokens as needed.
      isTokenAutoRefreshEnabled: true,
      provider: new ReCaptchaV3Provider(Config.reCAPTCHASiteKey),
      size: 'invisible',
    });

    debug('App check passed');

    const auth = yield call(getAuth);
    let user = yield call(handleAuthChangeState, auth);

    if (user) {
      yield put(fetchFavoritedRestaurants(user.uid));
      const [, errorAction] = yield call(awaitAsyncAction, FETCH_FAVORITED_RESTAURANTS);

      if (errorAction) {
        const { payload: error } = errorAction;
        if (error) throw error;
      }
    } else {
      yield call(setPersistence, auth, browserLocalPersistence);
      ({ user } = yield call(signInAnonymously, auth));

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
