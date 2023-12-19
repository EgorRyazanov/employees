import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppErrorMapper } from '../../api/mappers/appErrorMapper';
import { AuthApi } from '../../api/services/authApi';
import { Login } from '../../models/login';
import { isApiError } from '../../utils/isApiError';
import { actions } from './actions';
import { loginMapper } from '../../api/mappers/loginMapper';
import { UserSecretStorageService } from '../../api/services/userSecretStorage';
import { PersonStore } from '../person';

const login = createAsyncThunk(`login/login`, async (form: Login, { dispatch }) => {
  dispatch(actions.request());
  try {
    const secret = await AuthApi.login(form);
    dispatch(actions.success());
    dispatch(PersonStore.thunks.getMe());
    UserSecretStorageService.save(secret);
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDtoWithValidationSupport(error, loginMapper);
      dispatch(actions.failure(appError));
    }

    throw error;
  }
});

export const thunks = {
  login,
};
