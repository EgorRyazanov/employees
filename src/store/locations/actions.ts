import { createAction } from '@reduxjs/toolkit';

const name = 'locations';

export const actions = {
  startLocationsRequest: createAction(`${name}/startLocationsRequest`),
  startDepartmentsRequest: createAction(`${name}/startDepartmentsRequest`),
  startDivisionsRequest: createAction(`${name}/startDivisionsRequest`),
  getLocations: createAction<string[]>(`${name}/getLocations`),
  getDepartments: createAction<string[]>(`${name}/getDepartments`),
  getDivisions: createAction<string[]>(`${name}/getDivisions`),
};
