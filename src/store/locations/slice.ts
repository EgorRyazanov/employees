import { createReducer } from '@reduxjs/toolkit';

import { actions } from './actions';
import { initialState } from './initial';
import { STATUS } from '../../api/services/utils/status';

export const reducer = createReducer(initialState, builder => {
  builder.addCase(actions.startDepartmentsRequest, state => {
    state.isDepartmentsStatus = STATUS.request;
  });
  builder.addCase(actions.startLocationsRequest, state => {
    state.isLocationsStatus = STATUS.request;
  });
  builder.addCase(actions.startDivisionsRequest, state => {
    state.isDivisionsStatus = STATUS.request;
  });
  builder.addCase(actions.getLocations, (state, { payload }) => {
    state.locations = payload;
    state.isLocationsStatus = STATUS.success;
  });
  builder.addCase(actions.getDepartments, (state, { payload }) => {
    state.departments = payload;
    state.isDepartmentsStatus = STATUS.success;
  });
  builder.addCase(actions.getDivisions, (state, { payload }) => {
    state.divisions = payload;
    state.isDivisionsStatus = STATUS.success;
  });
});
