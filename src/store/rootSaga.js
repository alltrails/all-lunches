import { fork, all } from 'redux-saga/effects';

import loggerSaga from 'lib/loggerSaga';
import appSagas from './app/sagas';
import userSagas from './user/sagas';
import restaurantsSagas from './restaurants/sagas';

const sagas = [loggerSaga, ...appSagas, ...userSagas, ...restaurantsSagas];

export default function* rootSaga() {
  yield all(sagas.map((saga) => fork(saga)));
}
