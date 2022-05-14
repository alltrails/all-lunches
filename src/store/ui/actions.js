import { createAction } from 'lib/reduxUtils';

// Sync
export const TOGGLE_OPEN_TOAST = 'ui/toggleOpenToast';
export const toggleOpenToast = createAction(TOGGLE_OPEN_TOAST);
