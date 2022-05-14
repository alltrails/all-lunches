import { takeEvery } from 'redux-saga/effects';

import { asyncSuffixes } from 'lib/reduxUtils';
import { trackEvent } from 'lib/analytics';

const ERROR_REGEX = new RegExp(`${asyncSuffixes.ERROR}$`);

const parseNetworkError = (error) => {
  try {
    const parsed = {
      headers: error.config.headers,
      method: error.config.method,
      url: error.config.url,
    };

    if (error.response) {
      parsed.data = error.response.data;
      parsed.status = error.response.status;
    } else if (error.request) {
      parsed.status = 0;
    }

    return parsed;
  } catch (e) {
    return error;
  }
};

export function logger(action) {
  const { descriptor, log, payload, type } = action;

  if (!log) return;

  const isError = ERROR_REGEX.test(type);

  if (isError) {
    if (payload) {
      trackEvent(descriptor, {
        error: payload.config ? parseNetworkError(payload) : payload.toString(),
      });
    } else {
      trackEvent('Undefined error caught', {
        descriptor,
        payload,
      });
    }
  } else {
    trackEvent(descriptor, {
      payload,
    });
  }
}

export default function* loggerSaga() {
  yield takeEvery('*', logger);
}
