import { createSelector } from '@reduxjs/toolkit';

import { STATUS } from '../../api/services/utils/status';
import { TRootState } from '..';

const root = (state: TRootState) => state.user;

const SelectIsUserLoading = createSelector(root, data => data.status === STATUS.request);

const SelectIsUserInitial = createSelector(root, data => data.status === STATUS.initial);

const SelectIsUserReady = createSelector(
  [SelectIsUserLoading, SelectIsUserInitial],
  (loading, initial) => !loading && !initial,
);

const selectUserErrors = createSelector(root, data => data.error);

export const userSelectors = {
  SelectIsUserLoading,
  SelectIsUserInitial,
  SelectIsUserReady,
  selectUserErrors,
};
