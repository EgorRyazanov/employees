import { createSelector } from '@reduxjs/toolkit';

import { TRootState } from '..';

const root = (state: TRootState) => state.locations;

const SelectLocations = createSelector(root, data => data.locations);

const SelectDepartments = createSelector(root, data => data.departments);

const SelectDivisions = createSelector(root, data => data.divisions);

const SelectLocationsStatus = createSelector(root, data => data.locationsStatus);

const SelectDepartmentsStatus = createSelector(root, data => data.departmentsStatus);

const SelectDivisionsStatus = createSelector(root, data => data.divisionsStatus);

export const locationsSelectors = {
  SelectLocations,
  SelectDepartments,
  SelectDivisions,
  SelectLocationsStatus,
  SelectDepartmentsStatus,
  SelectDivisionsStatus,
};
