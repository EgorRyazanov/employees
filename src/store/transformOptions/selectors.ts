import { createSelector } from '@reduxjs/toolkit';

import { TRootState } from '..';

const root = (state: TRootState) => state.transformOptions;

const SelectOptions = createSelector(root, data => data.options);

export const transformOptionsSelectors = {
  SelectOptions,
};
