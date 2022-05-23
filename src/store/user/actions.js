import { createAsyncAction, createAsyncTypes } from 'lib/reduxUtils';

// Async
export const VALIDATE_USER = createAsyncTypes('user/validateUser');
export const validateUser = createAsyncAction(VALIDATE_USER);
