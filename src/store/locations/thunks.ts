import { createAsyncThunk } from '@reduxjs/toolkit';

import { actions } from './actions';
import { LocationsApi } from '../../api/services/locationsApi';
import { STATUS } from '../../api/services/utils/status';

const getLocations = createAsyncThunk(`auth/getLocations`, async (_, { dispatch }) => {
  dispatch(actions.changeLocationsStatus(STATUS.request));
  try {
    const locations = await LocationsApi.getLocations();
    dispatch(actions.getLocations(locations));
  } catch (error: unknown) {
    dispatch(actions.changeLocationsStatus(STATUS.failure));

    throw error;
  }
});

export const thunks = {
  getLocations,
};
