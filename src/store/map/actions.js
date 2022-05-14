import { createAsyncAction, createAsyncTypes } from 'lib/reduxUtils';

// Async
export const ADD_REPORT = createAsyncTypes('map/addReport');
export const addReport = createAsyncAction(ADD_REPORT);

export const QUERY_AREA = createAsyncTypes('map/queryArea');
export const queryArea = createAsyncAction(QUERY_AREA);
