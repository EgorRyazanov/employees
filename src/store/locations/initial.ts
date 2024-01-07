import { STATUS } from '../../api/services/utils/status';

export type LocationsState = {
  locations: string[];
  divisions: string[];
  departments: string[];
  groups: string[];
  userPositions: string[];
  locationsStatus: STATUS;
  divisionsStatus: STATUS;
  departmentsStatus: STATUS;
  groupsStatus: STATUS;
  userPositionsStatus: STATUS;
};

export const initialState: LocationsState = {
  locations: [],
  divisions: [],
  departments: [],
  groups: [],
  userPositions: [],
  locationsStatus: STATUS.initial,
  divisionsStatus: STATUS.initial,
  departmentsStatus: STATUS.initial,
  groupsStatus: STATUS.initial,
  userPositionsStatus: STATUS.initial,
};
