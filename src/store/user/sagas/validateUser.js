/* eslint-disable prefer-promise-reject-errors */
import Debug from 'debug';
import { call, put, takeLatest } from 'redux-saga/effects';
import Config from 'config'; // eslint-disable-line

import {
  getAuth,
  signInAnonymously,
  browserSessionPersistence,
  setPersistence,
  onAuthStateChanged,
} from 'firebase/auth';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

import { VALIDATE_USER, validateUser } from '../actions';

const debug = Debug('allLunches:store:user:sagas:validateUser');

const handleAuthChangeState = (auth) =>
  new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      debug('User', user);

      if (user && !user.isAnonymous && !user.stsTokenManager.isExpired) resolve(user);
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
    const user = yield call(handleAuthChangeState, auth);

    if (user) {
      debug('Fetching existing user', user);
      // fetch credentials like name and other data
      // set persistence to browserLocalPersistence
      // user = this.data();
    } else {
      yield call(setPersistence, auth, browserSessionPersistence);
      yield call(signInAnonymously, auth);

      debug('Logged in anonymously');
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
