import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '..';

const root = (state: RootState) => state.nodeDetails;

const SelectNode = createSelector(root, data => data.node);

const SelectIsModalActive = createSelector(root, data => data.isModalActive);

export const nodeDetailsSelectors = {
  SelectNode,
  SelectIsModalActive,
};
