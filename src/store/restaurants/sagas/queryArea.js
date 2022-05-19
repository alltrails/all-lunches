import Debug from 'debug';
import { put, takeLatest } from 'redux-saga/effects';
import { camelizeKeys } from 'humps';

import { create } from 'lib/reduxUtils';

import { ALL_TRAILS_HQ_LAT, ALL_TRAILS_HQ_LNG } from 'lib/mapUtils';

import { QUERY_AREA, queryArea } from '../actions';

const debug = Debug('all-lunches:store:map:sagas:queryArea');

export function* queryAreaSaga({ payload: searchText }) {
  debug('Saga called', searchText);

  const {
    google: { maps: mapsInstance },
  } = window;

  try {
    if (!mapsInstance) throw new Error('Unable to load Google Maps API');

    let restaurants;

    const latLng = yield create(mapsInstance.LatLng, ALL_TRAILS_HQ_LAT, ALL_TRAILS_HQ_LNG);

    const map = yield create(mapsInstance.Map, document.createElement('div'), {
      center: latLng,
      zoom: 12,
    });

    const request = {
      location: latLng,
      radius: '50',
      type: ['restaurant'],
      ...(searchText && { query: searchText }),
    };

    const service = yield create(mapsInstance.places.PlacesService, map);

    const { results, status } = yield new Promise((resolve) => {
      service.textSearch(request, (response, responseStatus) => {
        resolve({ results: response, status: responseStatus });
      });
    });

    if (status === mapsInstance.places.PlacesServiceStatus.OK) restaurants = camelizeKeys(results);
    else throw new Error('Unable to fetch any restaurants in this area');

    debug('Data received', restaurants);

    yield put(queryArea.success(restaurants));
  } catch (e) {
    debug('Saga error', e);

    yield put(queryArea.error(e));
  }
}

export default function* () {
  yield takeLatest(QUERY_AREA.PENDING, queryAreaSaga);
}
