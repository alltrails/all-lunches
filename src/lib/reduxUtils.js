import { call } from 'redux-saga/effects';

export const asyncSuffixes = {
  ERROR: 'Error',
  PENDING: 'Pending',
  SUCCESS: 'Success',
};

export const create = (SomeClass, ...args) => call(() => new SomeClass(...args));

const actionTypeToString = (type) => {
  try {
    const w = type.split('/')[1].replace(/([A-Z])/g, ' $1');

    return w.charAt(0).toUpperCase() + w.substr(1);
  } catch (e) {
    return type;
  }
};

export const createAsyncTypes = (typeString) =>
  Object.keys(asyncSuffixes).reduce((acc, suffixKey) => {
    const suffix = asyncSuffixes[suffixKey];

    return {
      [suffixKey]: `${typeString}${suffix}`,
      ...acc,
    };
  }, {});

export const createAction =
  (type, { log = false } = {}) =>
  (payload, retryAction) => ({
    descriptor: actionTypeToString(type),
    log,
    payload,
    type,
    ...(retryAction ? { retryAction } : {}),
  });

const defaultLogOptions = {
  ERROR: true,
  PENDING: false,
  SUCCESS: false,
};

export const createAsyncAction = (type, options = {}) => {
  const logOptions = {
    ...defaultLogOptions,
    ...(options.log || {}),
  };

  return Object.assign(createAction(type.PENDING, { ...options, log: logOptions.PENDING }), {
    error: createAction(type.ERROR, { ...options, log: logOptions.ERROR }),
    success: createAction(type.SUCCESS, {
      ...options,
      log: logOptions.SUCCESS,
    }),
  });
};
