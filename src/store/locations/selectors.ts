import { createSelector } from '@reduxjs/toolkit';

import { TRootState } from '..';

const root = (state: TRootState) => state.locations;

const SelectLocations = createSelector(root, data => data.locations);

const SelectDepartments = createSelector(root, data => data.departments);

const SelectDivisions = createSelector(root, data => data.divisions);

const SelectGroup = createSelector(root, data => data.groups);

const SelectWorkTypes = createSelector(root, data => data.userWorkTypes);

const SelectUserPositions = createSelector(root, data => data.userPositions);

const SelectUserWorkTypesStatus = createSelector(root, data => data.userWorkTypesStatus);

const SelectLocationsStatus = createSelector(root, data => data.locationsStatus);

const SelectDepartmentsStatus = createSelector(root, data => data.departmentsStatus);

const SelectDivisionsStatus = createSelector(root, data => data.divisionsStatus);

const SelectGroupStatus = createSelector(root, data => data.groupsStatus);

const SelectUserPositionsStatus = createSelector(root, data => data.userPositionsStatus);

export const locationsSelectors = {
  SelectLocations,
  SelectDepartments,
  SelectDivisions,
  SelectGroup,
  SelectLocationsStatus,
  SelectDepartmentsStatus,
  SelectDivisionsStatus,
  SelectGroupStatus,
  SelectUserPositionsStatus,
  SelectUserPositions,
  SelectWorkTypes,
  SelectUserWorkTypesStatus,
};
