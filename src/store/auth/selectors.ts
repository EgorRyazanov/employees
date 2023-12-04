import { createSelector } from '@reduxjs/toolkit';

import { STATUS } from '../../api/services/utils/status';
import { TRootState } from '..';

const root = (state: TRootState) => state.auth;

const SelectIsUserFetching = createSelector(root, data => data.status === STATUS.request);

const SelectIsUserInitial = createSelector(root, data => data.status === STATUS.initial);

const SelectIsUserReady = createSelector(
  [SelectIsUserFetching, SelectIsUserInitial],
  (loading, initial) => !loading && !initial,
);

const selectUser = createSelector(root, data => data.user);

const selectAuthErrors = createSelector(root, data => data.error);

export const authSelectors = {
  SelectIsUserFetching,
  SelectIsUserInitial,
  SelectIsUserReady,
  selectUser,
  selectAuthErrors,
};
