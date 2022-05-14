/* eslint-disable eqeqeq */
/* eslint-disable brace-style */

import Debug from 'debug';
import { call, put } from 'redux-saga/effects';
import UAParser from 'ua-parser-js';

import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

import Config from 'config'; // eslint-disable-line
import 'lib/sentry';

import awaitAsyncAction from 'lib/awaitAsyncAction';

import { setUserAgent } from 'store/userAgent/actions';
import { VALIDATE_USER, validateUser } from 'store/user/actions';
import { initializeApplication } from 'store/app/actions';

const debug = Debug('allLunches:store:app:sagas:sessionManager');

function* setUserAgentAction() {
  const userAgent = UAParser();
  yield put(setUserAgent({ userAgent }));
}

function* enableOfflinePersistence(app) {
  const db = getFirestore(app);

  try {
    // Subsequent queries will use persistence, if it was enabled successfully
    yield call(enableIndexedDbPersistence, db);
  } catch (error) {
    if (error.code == 'failed-precondition') {
      debug('Multiple tabs open, persistence can only be enabled in one tab at a a time.');
    } else if (error.code == 'unimplemented') {
      debug(
        'The current browser does not support all of the features required to enable persistence',
      );
    }
  }
  debug('DB persistence enabled');
}

export default function* initSessionManager() {
  yield put(initializeApplication());
  debug('Saga called');

  try {
    yield* setUserAgentAction();
    const app = yield call(initializeApp, Config.firebaseConfig);

    yield* enableOfflinePersistence(app);

    yield put(validateUser(app));
    const [, errorAction] = yield call(awaitAsyncAction, VALIDATE_USER);

    if (errorAction) {
      const { payload: error } = errorAction;
      if (error) throw error;
    }

    yield put(initializeApplication.success());
  } catch (e) {
    debug('Saga error', e);
    yield put(initializeApplication.error(e));
  }
}
