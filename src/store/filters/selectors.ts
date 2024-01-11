import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '..';

const root = (state: RootState) => state.filters;

const SelectLocation = createSelector(root, data => data.location);

const SelectFilterLevelDisplayed = createSelector(root, data => data.filterLevelDisplayed);

const SelectShouldShowAllFields = createSelector(root, data => data.shouldShowAllNodeFields);

const SelectOptionsParams = createSelector(root, data => data.paramsOptions);

const SelectPersonsFilter = createSelector(root, data => data.persons);

export const filtersSelectors = {
  SelectLocation,
  SelectFilterLevelDisplayed,
  SelectOptionsParams,
  SelectPersonsFilter,
  SelectShouldShowAllFields,
};
