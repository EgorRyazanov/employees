import { STATUS } from '../../api/services/utils/status';

export type LocationsState = {
  locations: string[];
  divisions: string[];
  departments: string[];
  groups: string[];
  userPositions: string[];
  userWorkTypes: string[];
  locationsStatus: STATUS;
  divisionsStatus: STATUS;
  departmentsStatus: STATUS;
  groupsStatus: STATUS;
  userPositionsStatus: STATUS;
  userWorkTypesStatus: STATUS;
};

export const initialState: LocationsState = {
  locations: [],
  divisions: [],
  departments: [],
  groups: [],
  userPositions: [],
  userWorkTypes: [],
  locationsStatus: STATUS.initial,
  divisionsStatus: STATUS.initial,
  departmentsStatus: STATUS.initial,
  groupsStatus: STATUS.initial,
  userPositionsStatus: STATUS.initial,
  userWorkTypesStatus: STATUS.initial,
};
