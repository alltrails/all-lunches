import { createAsyncAction, createAsyncTypes } from 'lib/reduxUtils';

// Async
export const VALIDATE_USER = createAsyncTypes('auth/validateUser');
export const validateUser = createAsyncAction(VALIDATE_USER);
