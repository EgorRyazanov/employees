import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppErrorMapper } from '../../api/mappers/appErrorMapper';
import { isApiError } from '../../utils/isApiError';
import { actions } from './actions';
import { NodeApi } from '../../api/services/nodeApi';
import { NodesFilter } from '../../models/nodeFilters';

const getNodes = createAsyncThunk(`node/get`, async (filters: NodesFilter, { dispatch }) => {
  dispatch(actions.request());
  try {
    const nodes = await NodeApi.get(filters);
    dispatch(actions.success(nodes));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDto(error);
      dispatch(actions.failure(appError));
    }

    throw error;
  }
});

export const thunks = {
  getNodes,
};
