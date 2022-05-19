/* eslint-env jest */

import { call, put } from 'redux-saga/effects';

import UAParser from 'ua-parser-js';
import { initializeApp } from 'firebase/app';
import { enableIndexedDbPersistence } from 'firebase/firestore';

import Config from 'config'; // eslint-disable-line
import awaitAsyncAction from 'lib/awaitAsyncAction';

import { setUserAgent } from 'store/userAgent/actions';
import { VALIDATE_USER, validateUser } from 'store/user/actions';
import { QUERY_AREA, queryArea } from 'store/restaurants/actions';
import { initializeApplication } from 'store/app/actions';

import sessionManager from '../sessionManager';

describe('Saga: sessionManager', () => {
  const userAgentSetup = () => ({
    userAgent: UAParser(),
  });

  describe.only('Functions as expected', () => {
    const generator = sessionManager();
    const app = {};

    it('sets up the app', () => {
      expect(generator.next().value).toEqual(put(initializeApplication()));
      expect(generator.next().value).toEqual(put(setUserAgent(userAgentSetup())));
    });

    it('initializes firebase', () => {
      expect(generator.next().value).toEqual(call(initializeApp, Config.firebaseConfig));
      expect(generator.next(app).value).toEqual(call(enableIndexedDbPersistence, {}));
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

  describe('Invalid user error', () => {
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
      expect(generator.next().value).toEqual(put(setUserAgent(userAgentSetup())));
    });

    it('initializes firebase', () => {
      expect(generator.next().value).toEqual(call(initializeApp, Config.firebaseConfig));
      expect(generator.next(app).value).toEqual(call(enableIndexedDbPersistence, {}));
    });

    it('dispatches the error action validating user', () => {
      expect(generator.next().value).toEqual(put(validateUser(app)));
      expect(generator.next().value).toEqual(call(awaitAsyncAction, VALIDATE_USER));
      expect(generator.next([undefined, errorAction]).value).toEqual(
        put(initializeApp.error(error)),
      );
      expect(generator.next().done).toBe(true);
    });

    it('dispatches the error action', () => {});
  });

  describe('Invalid query restaurants error', () => {
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
      expect(generator.next().value).toEqual(put(setUserAgent(userAgentSetup())));
    });

    it('initializes firebase', () => {
      expect(generator.next().value).toEqual(call(initializeApp, Config.firebaseConfig));
      expect(generator.next(app).value).toEqual(call(enableIndexedDbPersistence, {}));
    });

    it('validates user', () => {
      expect(generator.next().value).toEqual(put(validateUser(app)));
      expect(generator.next().value).toEqual(call(awaitAsyncAction, VALIDATE_USER));
    });

    it('dispatches the error action querying restaurants', () => {
      expect(generator.next().value).toEqual(put(validateUser(app)));
      expect(generator.next().value).toEqual(call(awaitAsyncAction, VALIDATE_USER));

      expect(generator.next([undefined, errorAction]).value).toEqual(
        put(initializeApp.error(error)),
      );
      expect(generator.next().done).toBe(true);
    });
  });
});
