import { createSelector } from '@reduxjs/toolkit';

import { TRootState } from '..';

const root = (state: TRootState) => state.nodeDetails;

const SelectNode = createSelector(root, data => data.node);

const SelectIsModalActive = createSelector(root, data => data.isModalActive);

export const nodeDetailsSelectors = {
  SelectNode,
  SelectIsModalActive,
};
