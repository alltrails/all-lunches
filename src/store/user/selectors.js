import { createSelector } from 'reselect';

export const userSelector = (state) => state.user.user;

export const userIdSelector = createSelector(userSelector, (user) => user?.uid ?? null);
