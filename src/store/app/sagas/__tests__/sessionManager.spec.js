/* eslint-env jest */

import { call, put } from 'redux-saga/effects';

import UAParser from 'ua-parser-js';

import { enableOfflinePersistence, initializeFirebase } from 'lib/firebaseHelpers';

import awaitAsyncAction from 'lib/awaitAsyncAction';

import { setUserAgent } from 'store/userAgent/actions';
import { VALIDATE_USER, validateUser } from 'store/user/actions';
import { QUERY_AREA, queryArea } from 'store/restaurants/actions';
import { initializeApplication } from 'store/app/actions';

import sessionManager, { debug } from '../sessionManager';

describe('Saga: sessionManager', () => {
  describe('Functions as expected', () => {
    const generator = sessionManager();
    const app = {};

    it('sets up the app', () => {
      expect(generator.next().value).toEqual(put(initializeApplication()));
      expect(generator.next().value).toEqual(put(setUserAgent(UAParser())));
    });

    it('initializes firebase and offline persistence', () => {
      expect(generator.next().value).toEqual(call(initializeFirebase));
      expect(generator.next(app).value).toEqual(call(enableOfflinePersistence, app, debug));
    });

    it('validates user', () => {
      expect(generator.next().value).toEqual(put(validateUser(app)));
      expect(generator.next().value).toEqual(call(awaitAsyncAction, VALIDATE_USER));
    });

    it('queries for restaurants', () => {
      expect(generator.next([undefined, undefined]).value).toEqual(put(queryArea()));
      expect(generator.next().value).toEqual(call(awaitAsyncAction, QUERY_AREA));
    });

    it('dispatches the success action', () => {
      expect(generator.next([undefined, undefined]).value).toEqual(
        put(initializeApplication.success()),
      );
      expect(generator.next().done).toBe(true);
    });
  });

  describe('Functions as expected when validating user errors', () => {
    const generator = sessionManager();
    const app = {};

    const error = {
      response: {
        data: { message: 'Danger zone' },
        status: 401,
      },
    };
    const errorAction = { payload: error };

    it('sets up the app', () => {
      expect(generator.next().value).toEqual(put(initializeApplication()));
      expect(generator.next().value).toEqual(put(setUserAgent(UAParser())));
    });

    it('initializes firebase and offline persistence', () => {
      expect(generator.next().value).toEqual(call(initializeFirebase));
      expect(generator.next(app).value).toEqual(call(enableOfflinePersistence, app, debug));
    });

    it('dispatches the error action validating user', () => {
      expect(generator.next().value).toEqual(put(validateUser(app)));
      expect(generator.next().value).toEqual(call(awaitAsyncAction, VALIDATE_USER));
      expect(generator.next([undefined, errorAction]).value).toEqual(
        put(initializeApplication.error(error)),
      );
      expect(generator.next().done).toBe(true);
    });
  });

  describe('Functions as expected when querying an area for restaurants errors', () => {
    const generator = sessionManager();
    const app = {
      getProvider: () => {},
    };

    const error = {
      response: {
        data: { message: 'Danger zone' },
        status: 401,
      },
    };
    const errorAction = { payload: error };

    it('sets up the app', () => {
      expect(generator.next().value).toEqual(put(initializeApplication()));
      expect(generator.next().value).toEqual(put(setUserAgent(UAParser())));
    });

    it('initializes firebase and offline persistence', () => {
      expect(generator.next().value).toEqual(call(initializeFirebase));
      expect(generator.next(app).value).toEqual(call(enableOfflinePersistence, app, debug));
    });

    it('validates user', () => {
      expect(generator.next().value).toEqual(put(validateUser(app)));
      expect(generator.next().value).toEqual(call(awaitAsyncAction, VALIDATE_USER));
    });

    it('dispatches the error action querying restaurants', () => {
      expect(generator.next([undefined, undefined]).value).toEqual(put(queryArea()));
      expect(generator.next().value).toEqual(call(awaitAsyncAction, QUERY_AREA));

      expect(generator.next([undefined, errorAction]).value).toEqual(
        put(initializeApplication.error(error)),
      );
      expect(generator.next().done).toBe(true);
    });
  });
});
