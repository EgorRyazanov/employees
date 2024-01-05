import { STATUS } from '../../api/services/utils/status';

export type LocationsState = {
  locations: string[];
  divisions: string[];
  departments: string[];
  locationsStatus: STATUS;
  divisionsStatus: STATUS;
  departmentsStatus: STATUS;
};

export const initialState: LocationsState = {
  locations: [],
  divisions: [],
  departments: [],
  locationsStatus: STATUS.initial,
  divisionsStatus: STATUS.initial,
  departmentsStatus: STATUS.initial,
};
