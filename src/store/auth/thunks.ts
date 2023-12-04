import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppErrorMapper } from '../../api/mappers/appErrorMapper';
import { AuthApi } from '../../api/services/authApi';
import { Login } from '../../models/login';
import { isApiError } from '../../utils/isApiError';
import { actions } from './actions';

const login = createAsyncThunk(`login/login`, async (form: Login, { dispatch }) => {
  dispatch(actions.request());
  try {
    const user = await AuthApi.login(form);
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
  login,
};
