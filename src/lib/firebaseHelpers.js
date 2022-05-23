import { initializeApp } from 'firebase/app';
import { setDoc, getFirestore, enableIndexedDbPersistence, doc, getDoc } from 'firebase/firestore';
import {
  getAuth,
  signInAnonymously,
  browserLocalPersistence,
  setPersistence,
  onAuthStateChanged,
} from 'firebase/auth';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

import Config from 'config'; // eslint-disable-line

export const initializeFirebase = () => initializeApp(Config.firebaseConfig);

export const initializeApplicationCheck = async (app) =>
  initializeAppCheck(app, {
    // Optional argument. If true, the SDK automatically refreshes App Check
    // tokens as needed.
    isTokenAutoRefreshEnabled: true,
    provider: new ReCaptchaV3Provider(Config.reCAPTCHASiteKey),
    size: 'invisible',
  });

export const getAuthentication = async () => getAuth();

export const signUserInAnonymously = async (auth) => signInAnonymously(auth);

export const handleAuthenticationStateChange = (auth, debug) =>
  new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      debug('User', user);

      if (user && !user.stsTokenManager.isExpired) resolve(user);
      else resolve(null);
    });
  });

export const setUserLocalPersistence = async (auth) =>
  setPersistence(auth, browserLocalPersistence);

export const enableOfflinePersistence = (app, debug) => {
  const db = getFirestore(app);

  try {
    enableIndexedDbPersistence(db);
  } catch (error) {
    if (error.code === 'failed-precondition') {
      debug('Multiple tabs open, persistence can only be enabled in one tab at a a time.');
    } else if (error.code === 'unimplemented') {
      debug(
        'The current browser does not support all of the features required to enable persistence',
      );
    }
  }
  debug('DB persistence enabled');
};

export const getFirebaseDB = () => getFirestore();

export const getFirebaseDoc = (db, refName, docID) => doc(db, refName, docID);

export const fetchDoc = async (ref) => getDoc(ref);

export const postDoc = async (ref, data) => setDoc(ref, data);
