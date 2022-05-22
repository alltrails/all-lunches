/* eslint-disable eqeqeq */
/* eslint-disable brace-style */

import Debug from 'debug';
import { call, put } from 'redux-saga/effects';
import UAParser from 'ua-parser-js';

import { enableOfflinePersistence, initializeFirebase } from 'lib/firebaseHelpers';
import 'lib/sentry';

import awaitAsyncAction from 'lib/awaitAsyncAction';

import { setUserAgent } from 'store/userAgent/actions';
import { VALIDATE_USER, validateUser } from 'store/user/actions';
import { QUERY_AREA, queryArea } from 'store/restaurants/actions';
import { initializeApplication } from 'store/app/actions';

export const debug = Debug('all-lunches:store:app:sagas:sessionManager');

function* setUserAgentAction() {
  const userAgent = UAParser();
  yield put(setUserAgent(userAgent));
}

export default function* initSessionManager() {
  yield put(initializeApplication());
  debug('Saga called');

  try {
    yield* setUserAgentAction();
    const app = yield call(initializeFirebase);

    yield call(enableOfflinePersistence, app, debug);

    yield put(validateUser(app));
    const [, validateUserError] = yield call(awaitAsyncAction, VALIDATE_USER);

    if (validateUserError) {
      const { payload: error } = validateUserError;
      if (error) throw error;
    }

    yield put(queryArea());
    const [, queryAreaError] = yield call(awaitAsyncAction, QUERY_AREA);

    if (queryAreaError) {
      const { payload: error } = queryAreaError;
      if (error) throw error;
    }

    yield put(initializeApplication.success());
  } catch (e) {
    debug('Saga error', e);
    yield put(initializeApplication.error(e));
  }
}
