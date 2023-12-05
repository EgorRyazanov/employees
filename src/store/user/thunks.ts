import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppErrorMapper } from '../../api/mappers/appErrorMapper';
import { isApiError } from '../../utils/isApiError';
import { actions } from './actions';
import { UserApi } from '../../api/services/userApi';

const getMe = createAsyncThunk(`auth/getMe`, async (_, { dispatch }) => {
  dispatch(actions.request());
  try {
    const user = await UserApi.getMe();
    dispatch(actions.success(user));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDto(error);
      dispatch(actions.failure(appError));
    }

    throw error;
  }
});

export const thunks = {
  getMe,
};
