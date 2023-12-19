import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppErrorMapper } from '../../api/mappers/appErrorMapper';
import { isApiError } from '../../utils/isApiError';
import { actions } from './actions';
import { PersonApi } from '../../api/services/personApi';
import { PersonDetails } from '../../models/personDetails';

const getMe = createAsyncThunk(`auth/getMe`, async (_, { dispatch }) => {
  dispatch(actions.requestGettingMe());
  try {
    const person = await PersonApi.getMe();
    dispatch(actions.successGettingMe(person));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDto(error);
      dispatch(actions.failureGettingMe(appError));
    }

    throw error;
  }
});

const getPersonDetails = createAsyncThunk(`auth/getUserDetails`, async (userId: PersonDetails['id'], { dispatch }) => {
  dispatch(actions.requestGettingPersonDetails());
  try {
    const person = await PersonApi.getUserDetails(userId);
    dispatch(actions.successGettingPersonDetails(person));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDto(error);
      dispatch(actions.failureGettingPersonDetails(appError));
    }

    throw error;
  }
});

export const thunks = {
  getMe,
  getPersonDetails,
};
