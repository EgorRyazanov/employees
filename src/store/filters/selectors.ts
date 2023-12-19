import { createSelector } from '@reduxjs/toolkit';

import { TRootState } from '..';

const root = (state: TRootState) => state.filters;

const SelectLocation = createSelector(root, data => data.location);

export const filtersSelectors = {
  SelectLocation,
};
