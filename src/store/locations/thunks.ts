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

const getDepartments = createAsyncThunk(`auth/getDepartments`, async (_, { dispatch }) => {
  dispatch(actions.changeDepartmentsStatus(STATUS.request));
  try {
    const departments = await LocationsApi.getDepartments();
    dispatch(actions.getDepartments(departments));
  } catch (error: unknown) {
    dispatch(actions.changeDepartmentsStatus(STATUS.failure));

    throw error;
  }
});

const getDivisions = createAsyncThunk(`auth/getDivisions`, async (locationName: string | undefined, { dispatch }) => {
  dispatch(actions.changeDivisionsStatus(STATUS.request));
  try {
    const divisions = await LocationsApi.getDivisions(locationName);
    dispatch(actions.getDivisions(divisions));
  } catch (error: unknown) {
    dispatch(actions.changeDivisionsStatus(STATUS.failure));

    throw error;
  }
});

export const thunks = {
  getLocations,
  getDepartments,
  getDivisions,
};
