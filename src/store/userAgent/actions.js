import { createAction } from 'lib/reduxUtils';

export const SET_USER_AGENT = 'userAgent/setUserAgent';
export const setUserAgent = createAction(SET_USER_AGENT);
