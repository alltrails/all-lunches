import { initializeApp } from 'firebase/app';
import { setDoc, getFirestore, enableIndexedDbPersistence, doc, getDoc } from 'firebase/firestore';

import Config from 'config'; // eslint-disable-line

export const initializeFirebase = () => initializeApp(Config.firebaseConfig);

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

export const fetchDoc = (ref) => getDoc(ref);

export const postDoc = (ref, data) => setDoc(ref, data);
