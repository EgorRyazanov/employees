import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppErrorMapper } from '../../api/mappers/appErrorMapper';
import { isApiError } from '../../utils/isApiError';
import { actions } from './actions';
import { PersonApi } from '../../api/services/personApi';

const getPersons = createAsyncThunk(`persons/get`, async (_, { dispatch }) => {
  dispatch(actions.request());
  try {
    const persons = await PersonApi.getPersons();
    dispatch(actions.success(persons));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDto(error);
      dispatch(actions.failure(appError));
    }

    throw error;
  }
});

export const thunks = {
  getPersons,
};
