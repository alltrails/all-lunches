import { createAsyncAction, createAsyncTypes } from 'lib/reduxUtils';
// Async
export const INITIALIZE_APPLICATION = createAsyncTypes('app/initializeApplication');
export const initializeApplication = createAsyncAction(INITIALIZE_APPLICATION);
