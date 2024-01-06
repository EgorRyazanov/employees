import { createAction } from '@reduxjs/toolkit';
import { STATUS } from '../../api/services/utils/status';

const name = 'locations';

export const actions = {
  changeLocationsStatus: createAction<STATUS>(`${name}/changeLocationsStatus`),
  changeDepartmentsStatus: createAction<STATUS>(`${name}/changeDepartmentsStatus`),
  changeDivisionsStatus: createAction<STATUS>(`${name}/changeDivisionsStatus`),
  getLocations: createAction<string[]>(`${name}/getLocations`),
  getDepartments: createAction<string[]>(`${name}/getDepartments`),
  getDivisions: createAction<string[]>(`${name}/getDivisions`),
};
