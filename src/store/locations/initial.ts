import { STATUS } from '../../api/services/utils/status';

export type LocationsState = {
  locations: string[];
  divisions: string[];
  departments: string[];
  groups: string[];
  locationsStatus: STATUS;
  divisionsStatus: STATUS;
  departmentsStatus: STATUS;
  groupsStatus: STATUS;
};

export const initialState: LocationsState = {
  locations: [],
  divisions: [],
  departments: [],
  groups: [],
  locationsStatus: STATUS.initial,
  divisionsStatus: STATUS.initial,
  departmentsStatus: STATUS.initial,
  groupsStatus: STATUS.initial,
};
