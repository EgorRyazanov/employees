import { createSelector } from '@reduxjs/toolkit';

import { STATUS } from '../../api/services/utils/status';
import { RootState } from '..';

const root = (state: RootState) => state.persons;

const SelectIsPersonsLoading = createSelector(root, data => data.status === STATUS.request);

const SelectIsPersonsInitial = createSelector(root, data => data.status === STATUS.initial);

const SelectIsPersonsReady = createSelector(
  [SelectIsPersonsLoading, SelectIsPersonsInitial],
  (loading, initial) => !loading && !initial,
);

const SelectPersons = createSelector(root, data => data.persons);

export const personsSelectors = {
  SelectIsPersonsLoading,
  SelectIsPersonsInitial,
  SelectIsPersonsReady,
  SelectPersons,
};
