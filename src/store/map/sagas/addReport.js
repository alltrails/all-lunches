import Debug from 'debug';
import { v4 as uuidv4 } from 'uuid';
import * as geofire from 'geofire-common';

import { call, select, put, takeLatest } from 'redux-saga/effects';

import { Timestamp, arrayUnion, getFirestore, writeBatch, doc } from 'firebase/firestore';

import { toGeoJSONFeature } from 'lib/mapUtils';

import { userIdSelector, userDisplayNameSelector } from 'store/user/selectors';
import { ADD_REPORT, addReport } from '../actions';

const debug = Debug('allLunches:store:map:sagas:addReport');

export function* addReportSaga({ payload }) {
  debug('Saga called', payload);
  const { type, message, coordinates } = payload;

  const uid = uuidv4();
  const userId = yield select(userIdSelector);
  const displayName = yield select(userDisplayNameSelector);
  const date = Timestamp.now();
  const { lat, lng } = coordinates;

  const db = getFirestore();
  const batch = writeBatch(db);

  const reportData = {
    coordinates: { lat, lng },
    date,
    displayName,
    id: uid,
    isActive: true,
    message,
    type,
    userId,
  };

  debug('Report data', reportData);

  try {
    if (!userId) throw new Error('Please login in order to add a report');

    const hash = geofire.geohashForLocation([lat, lng]);

    const userRef = doc(db, 'users', userId);
    batch.set(userRef, { reports: arrayUnion(uid) }, { merge: true });

    const reportLocRef = doc(db, 'report-locations', uid);
    batch.set(reportLocRef, {
      geohash: hash,
      id: uid,
      isActive: true,
      lat: lat,
      lng: lng,
    });

    const reportDataRef = doc(db, 'report-data', uid);
    batch.set(reportDataRef, { ...reportData });

    yield call([batch, batch.commit]);

    const properties = { ...reportData, date: date.toDate() };
    const geoJSON = toGeoJSONFeature([lng, lat], properties);
    const newReport = { [type]: [geoJSON] };

    debug('Successfully adding', newReport);

    yield put(addReport.success(newReport));
  } catch (e) {
    debug('Saga error', e);

    yield put(addReport.error(e.message));
  }
}

export default function* () {
  yield takeLatest(ADD_REPORT.PENDING, addReportSaga);
}
