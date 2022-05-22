/* eslint-env jest */

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
import { VALIDATE_USER, validateUser } from 'store/user/actions';

import validateUserDefault, { validateUserSaga } from '../validateUser';

describe('Saga: validateUser', () => {
  const appInstance = {};
  const authInstance = {};
  const action = { payload: appInstance };
  const userObject = { uid: 'some_user_id' };

  it('listens to actions', () => {
    const generator = validateUserDefault();
    expect(generator.next().value).toEqual(takeLatest(VALIDATE_USER.PENDING, validateUserSaga));
    expect(generator.next().done).toBe(true);
  });

  describe('Functions as expected', () => {
    const generator = validateUserSaga(action);

    it('sets up firebase reference', () => {
      expect(generator.next().value).toEqual(call(initializeApplicationCheck, appInstance));
      expect(generator.next().value).toEqual(call(getAuthentication));
      expect(generator.next(authInstance).value).toEqual(
        call(handleAuthenticationStateChange, authInstance, {}),
      );
    });

    it('fetches favorited restaurants', () => {
      expect(generator.next(userObject).value).toEqual(
        put(fetchFavoritedRestaurants, userObject.uid),
      );
      expect(generator.next().value).toEqual(call(awaitAsyncAction, FETCH_FAVORITED_RESTAURANTS));
    });

    it('dispatches the success action', () => {
      expect(generator.next([undefined, undefined]).value).toEqual(
        put(validateUser.success(userObject)),
      );
      expect(generator.next().done).toBe(true);
    });
  });

  describe('Functions as expected when fetching favorited restaurants errors', () => {
    const generator = validateUserSaga(action);

    const error = {
      response: {
        data: { message: 'Danger zone' },
        status: 401,
      },
    };
    const errorAction = { payload: error };

    it('sets up firebase reference', () => {
      expect(generator.next().value).toEqual(call(initializeApplicationCheck, appInstance));
      expect(generator.next().value).toEqual(call(getAuthentication));
      expect(generator.next(authInstance).value).toEqual(
        call(handleAuthenticationStateChange, authInstance, {}),
      );
    });

    it('fetches favorited restaurants', () => {
      expect(generator.next(userObject).value).toEqual(
        put(fetchFavoritedRestaurants, userObject.uid),
      );
      expect(generator.next().value).toEqual(call(awaitAsyncAction, FETCH_FAVORITED_RESTAURANTS));
    });

    it('dispatches the success action', () => {
      expect(generator.next([undefined, errorAction]).value).toEqual(
        put(validateUser.error(error)),
      );
      expect(generator.next().done).toBe(true);
    });
  });

  describe('Functions as expected signing in user anonymously', () => {
    const generator = validateUserSaga(action);

    it('sets up firebase reference', () => {
      expect(generator.next().value).toEqual(call(initializeApplicationCheck, appInstance));
      expect(generator.next().value).toEqual(call(getAuthentication));
      expect(generator.next(authInstance).value).toEqual(
        call(handleAuthenticationStateChange, authInstance, {}),
      );
    });

    it('signs in user anonymously', () => {
      expect(generator.next({}).value).toEqual(call(signUserInAnonymously, authInstance));
      expect(generator.next({ user: userObject }).value).toEqual(
        call(setUserLocalPersistence, authInstance),
      );
    });

    it('dispatches the success action', () => {
      expect(generator.next().value).toEqual(put(validateUser.success(userObject)));
      expect(generator.next().done).toBe(true);
    });
  });

  describe('Functions as expected signing in user anonymously errors', () => {
    const generator = validateUserSaga(action);
    const fetchError = new Error('Some error happened');

    it('sets up firebase reference', () => {
      expect(generator.next().value).toEqual(call(initializeApplicationCheck, appInstance));
      expect(generator.next().value).toEqual(call(getAuthentication));
      expect(generator.next(authInstance).value).toEqual(
        call(handleAuthenticationStateChange, authInstance, {}),
      );
    });

    it('signs in user anonymously', () => {
      expect(generator.next({}).value).toEqual(call(signUserInAnonymously, authInstance));
    });

    it('dispatches the error action', () => {
      expect(generator.throw(fetchError).value).toEqual(
        put(validateUser.error(fetchError, action)),
      );
      expect(generator.next().done).toBe(true);
    });
  });
});
