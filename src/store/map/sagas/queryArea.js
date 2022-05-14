import Debug from 'debug';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as geofire from 'geofire-common';
import {
  getDocs,
  startAt,
  endAt,
  query,
  orderBy,
  collection,
  getFirestore,
  where,
} from 'firebase/firestore';

import { getBoundsRadius, toGeoJSONFeature } from 'lib/mapUtils';

import { QUERY_AREA, queryArea } from '../actions';

const debug = Debug('allLunches:store:map:sagas:queryArea');

export function* queryAreaSaga({ payload: bounds }) {
  debug('Saga called', bounds);

  const center = bounds.getCenter();
  const boundRadius = getBoundsRadius(bounds);

  try {
    const db = getFirestore();

    const geoBounds = geofire.geohashQueryBounds([center.lat, center.lng], boundRadius);
    const locQueries = geoBounds.map((bound) =>
      query(
        collection(db, 'report-locations'),
        orderBy('geohash'),
        startAt(bound[0]),
        endAt(bound[1]),
      ),
    );

    const locationSnapshots = yield all(locQueries.map((q) => call(getDocs, q)));
    const locDocIds = [];

    locationSnapshots.forEach((snap) => {
      snap.forEach((doc) => {
        const lat = doc.get('lat');
        const lng = doc.get('lng');

        const distanceInKm = geofire.distanceBetween([lat, lng], [center.lat, center.lng]);
        const distanceInM = distanceInKm * 1000;

        if (distanceInM <= boundRadius) locDocIds.push(doc.id);
      });
    });

    const numOfReports = locDocIds.length;
    debug('Total amount of location doc IDs fetched', numOfReports);

    if (!numOfReports) throw new Error('No reports found for this area');

    const reportDataRef = collection(db, 'report-data');
    const reportDataQueries = [];
    const numOfReportQueries = Math.ceil(locDocIds.length / 10);

    if (numOfReportQueries > 1) {
      Array.from(Array(numOfReportQueries).keys()).forEach((queryIndex, index) => {
        const start = index * 10;
        const end = (queryIndex + 1) * 10;

        reportDataQueries.push(
          query(
            reportDataRef,
            where('isActive', '==', true),
            where('id', 'in', locDocIds.slice(start, end)),
            orderBy('date'),
          ),
        );
      });
    } else
      reportDataQueries.push(
        query(
          reportDataRef,
          where('isActive', '==', true),
          where('id', 'in', locDocIds.slice(0, 10)),
          orderBy('date'),
        ),
      );

    debug('Report data queries ready', reportDataQueries);

    const reportDataSnapshots = yield all(reportDataQueries.map((q) => call(getDocs, q)));
    const reportData = [];

    debug('Fetched report data', reportDataSnapshots);

    reportDataSnapshots.forEach((snap) => {
      snap.forEach((doc) => {
        reportData.push(doc.data());
      });
    });

    const reports = reportData.reduce((acc, report) => {
      const {
        coordinates: { lat, lng },
        date,
        type,
      } = report;

      const properties = { ...report, date: date.toDate() };
      const coordinates = [lng, lat];
      const geoJSON = toGeoJSONFeature(coordinates, properties);

      if (acc[type]) acc[type] = [...acc[type], geoJSON];
      else acc[type] = [geoJSON];

      return acc;
    }, {});

    debug('Report data', reports);

    yield put(queryArea.success({ reports, numOfReports }));
  } catch (e) {
    debug('Saga error', e);

    yield put(queryArea.error(e));
  }
}

export default function* () {
  yield takeLatest(QUERY_AREA.PENDING, queryAreaSaga);
}
