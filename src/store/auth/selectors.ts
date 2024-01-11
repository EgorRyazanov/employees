import { createSelector } from '@reduxjs/toolkit';

import { STATUS } from '../../api/services/utils/status';
import { RootState } from '..';

const root = (state: RootState) => state.auth;

const SelectIsAuthLoading = createSelector(root, data => data.status === STATUS.request);

const SelectIsAuthInitial = createSelector(root, data => data.status === STATUS.initial);

const SelectIsAuthReady = createSelector(
  [SelectIsAuthLoading, SelectIsAuthInitial],
  (loading, initial) => !loading && !initial,
);

const selectAuthErrors = createSelector(root, data => data.error);

export const authSelectors = {
  SelectIsAuthLoading,
  SelectIsAuthInitial,
  SelectIsAuthReady,
  selectAuthErrors,
};
