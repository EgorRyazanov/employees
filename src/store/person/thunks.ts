import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppErrorMapper } from '../../api/mappers/appErrorMapper';
import { isApiError } from '../../utils/isApiError';
import { actions } from './actions';
import { PersonApi } from '../../api/services/personApi';
import { PersonDetails } from '../../models/personDetails';
import { NodeApi } from '../../api/services/nodeApi';

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

const getPersonDetails = createAsyncThunk(
  `auth/getPersonDetails`,
  async (userId: PersonDetails['id'], { dispatch }) => {
    dispatch(actions.requestGettingPersonDetails());
    try {
      dispatch(getPersonNode(userId));
      const person = await PersonApi.getPersonDetails(userId);
      dispatch(actions.successGettingPersonDetails(person));
    } catch (error: unknown) {
      if (isApiError(error)) {
        const appError = AppErrorMapper.fromDto(error);
        dispatch(actions.failureGettingPersonDetails(appError));
      }

      throw error;
    }
  },
);

const getPersonNode = createAsyncThunk(`auth/getPersonNode`, async (userId: PersonDetails['id'], { dispatch }) => {
  dispatch(actions.requestGettingPersonNode());
  try {
    const nodes = await NodeApi.getNodeByPersonId(userId);
    dispatch(actions.successGettingPersonNode(nodes));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDto(error);
      dispatch(actions.failureGettingPersonNode(appError));
    }

    throw error;
  }
});

export const thunks = {
  getMe,
  getPersonDetails,
  getPersonNode,
};
