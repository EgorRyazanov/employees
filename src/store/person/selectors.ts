import { createSelector } from '@reduxjs/toolkit';

import { STATUS } from '../../api/services/utils/status';
import { TRootState } from '..';

const root = (state: TRootState) => state.person;

const SelectIsMeLoading = createSelector(root, data => data.statusMe === STATUS.request);

const SelectIsMeInitial = createSelector(root, data => data.statusMe === STATUS.initial);

const SelectIsMeReady = createSelector(
  [SelectIsMeLoading, SelectIsMeInitial],
  (loading, initial) => !loading && !initial,
);

const SelectMe = createSelector(root, data => data.me);

const selectPersonErrors = createSelector(root, data => data.errorMe);

const SelectIsPersonDetailsLoading = createSelector(root, data => data.statusPersonDetails === STATUS.request);

const SelectIsPersonDetailsInitial = createSelector(root, data => data.statusPersonDetails === STATUS.initial);

const SelectIsPersonDetailsReady = createSelector(
  [SelectIsPersonDetailsLoading, SelectIsPersonDetailsInitial],
  (loading, initial) => !loading && !initial,
);

const SelectPersonDetails = createSelector(root, data => data.personDetails);

const selectPersonDetailsErrors = createSelector(root, data => data.errorPersonDetails);

export const personSelectors = {
  SelectIsMeLoading,
  SelectIsMeInitial,
  SelectIsMeReady,
  SelectMe,
  selectPersonErrors,
  SelectIsPersonDetailsLoading,
  SelectIsPersonDetailsInitial,
  SelectIsPersonDetailsReady,
  SelectPersonDetails,
  selectPersonDetailsErrors,
};
