import { createSelector } from '@reduxjs/toolkit';

import { STATUS } from '../../api/services/utils/status';
import { TRootState } from '..';

const root = (state: TRootState) => state.nodes;

const SelectIsNodesLoading = createSelector(root, data => data.status === STATUS.request);

const SelectIsNodesInitial = createSelector(root, data => data.status === STATUS.initial);

const SelectIsNodesReady = createSelector(
  [SelectIsNodesLoading, SelectIsNodesInitial],
  (loading, initial) => !loading && !initial,
);

const SelectNodes = createSelector(root, data => data.nodes);

export const nodeSelectors = {
  SelectIsNodesLoading,
  SelectIsNodesInitial,
  SelectIsNodesReady,
  SelectNodes,
};
