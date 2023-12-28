import { createSelector } from '@reduxjs/toolkit';

import { TRootState } from '..';

const root = (state: TRootState) => state.filters;

const SelectLocation = createSelector(root, data => data.location);

const SelectFilterLevelDisplayed = createSelector(root, data => data.filterLevelDisplayed);

const SelectOptionsParams = createSelector(root, data => data.paramsOptions);

export const filtersSelectors = {
  SelectLocation,
  SelectFilterLevelDisplayed,
  SelectOptionsParams,
};