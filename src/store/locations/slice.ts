import { createReducer } from '@reduxjs/toolkit';

import { actions } from './actions';
import { initialState } from './initial';
import { STATUS } from '../../api/services/utils/status';

export const reducer = createReducer(initialState, builder => {
  builder.addCase(actions.changeDepartmentsStatus, (state, { payload }) => {
    state.departmentsStatus = payload;
  });
  builder.addCase(actions.changeLocationsStatus, (state, { payload }) => {
    state.locationsStatus = payload;
  });
  builder.addCase(actions.changeDivisionsStatus, (state, { payload }) => {
    state.divisionsStatus = payload;
  });
  builder.addCase(actions.changeGroupsStatus, (state, { payload }) => {
    state.groupsStatus = payload;
  });
  builder.addCase(actions.getLocations, (state, { payload }) => {
    state.locations = payload;
    state.locationsStatus = STATUS.success;
  });
  builder.addCase(actions.getDepartments, (state, { payload }) => {
    state.departments = payload;
    state.departmentsStatus = STATUS.success;
  });
  builder.addCase(actions.getDivisions, (state, { payload }) => {
    state.divisions = payload;
    state.divisionsStatus = STATUS.success;
  });
  builder.addCase(actions.getGroups, (state, { payload }) => {
    state.groups = payload;
    state.groupsStatus = STATUS.success;
  });
});
