import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '..';

const root = (state: RootState) => state.transformOptions;

const SelectOptions = createSelector(root, data => data.options);

export const transformOptionsSelectors = {
  SelectOptions,
};
