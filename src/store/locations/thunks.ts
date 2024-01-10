import { createAsyncThunk } from '@reduxjs/toolkit';

import { actions } from './actions';
import { Department, Division, Group, Location, LocationsApi, Position } from '../../api/services/locationsApi';
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

const getDepartments = createAsyncThunk(
  `auth/getDepartments`,
  async (departmentsOptions: Location & Division, { dispatch }) => {
    dispatch(actions.changeDepartmentsStatus(STATUS.request));
    try {
      const departments = await LocationsApi.getDepartments(departmentsOptions);
      dispatch(actions.getDepartments(departments));
    } catch (error: unknown) {
      dispatch(actions.changeDepartmentsStatus(STATUS.failure));

      throw error;
    }
  },
);

const getDivisions = createAsyncThunk(`auth/getDivisions`, async (divisionOptions: Location, { dispatch }) => {
  dispatch(actions.changeDivisionsStatus(STATUS.request));
  try {
    const divisions = await LocationsApi.getDivisions(divisionOptions);
    dispatch(actions.getDivisions(divisions));
  } catch (error: unknown) {
    dispatch(actions.changeDivisionsStatus(STATUS.failure));

    throw error;
  }
});

const getGroups = createAsyncThunk(
  `auth/getGroups`,
  async (groupsOptions: Location & Division & Department, { dispatch }) => {
    dispatch(actions.changeGroupsStatus(STATUS.request));
    try {
      const divisions = await LocationsApi.getGroups(groupsOptions);
      dispatch(actions.getGroups(divisions));
    } catch (error: unknown) {
      dispatch(actions.changeGroupsStatus(STATUS.failure));

      throw error;
    }
  },
);

const getUserPositions = createAsyncThunk(
  `auth/getUserPositions`,
  async (userPositionsOptions: Location & Division & Department & Group, { dispatch }) => {
    dispatch(actions.changeUserPositionsStatus(STATUS.request));
    try {
      const userPositions = await LocationsApi.getUsersPositions(userPositionsOptions);
      dispatch(actions.getUsersPositions(userPositions));
    } catch (error: unknown) {
      dispatch(actions.changeUserPositionsStatus(STATUS.failure));

      throw error;
    }
  },
);

const getUserWorkTypes = createAsyncThunk(
  `auth/getUserWorkTypes`,
  async (userWorkTypesOptions: Location & Division & Department & Group & Position, { dispatch }) => {
    dispatch(actions.changeUserWorkTypesStatus(STATUS.request));
    try {
      const userWorkTypes = await LocationsApi.getUsersWorkTypes(userWorkTypesOptions);
      dispatch(actions.getUserWorkTypes(userWorkTypes));
    } catch (error: unknown) {
      dispatch(actions.changeUserWorkTypesStatus(STATUS.failure));

      throw error;
    }
  },
);

export const thunks = {
  getUserPositions,
  getLocations,
  getDepartments,
  getUserWorkTypes,
  getDivisions,
  getGroups,
};
