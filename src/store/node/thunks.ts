import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppErrorMapper } from '../../api/mappers/appErrorMapper';
import { isApiError } from '../../utils/isApiError';
import { actions } from './actions';
import { NodeApi } from '../../api/services/nodeApi';
import { Location } from '../../models/location';

const getNodes = createAsyncThunk(`node/get`, async (location: Location, { dispatch }) => {
  dispatch(actions.request());
  try {
    const nodes = await NodeApi.get(location);
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
