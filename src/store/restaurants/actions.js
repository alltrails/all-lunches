import { createAction, createAsyncAction, createAsyncTypes } from 'lib/reduxUtils';

// Sync
export const SET_SELECTED_ITEM_ID = 'restaurants/setSelectedItemId';
export const setSelectedItemId = createAction(SET_SELECTED_ITEM_ID);

export const SET_FILTER_OPTION = 'restaurants/setFilterOption';
export const setFilterOption = createAction(SET_FILTER_OPTION);

// Async
export const QUERY_AREA = createAsyncTypes('restaurants/queryArea');
export const queryArea = createAsyncAction(QUERY_AREA);
