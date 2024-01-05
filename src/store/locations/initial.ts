import { STATUS } from '../../api/services/utils/status';

export type LocationsState = {
  locations: string[];
  divisions: string[];
  departments: string[];
  isLocationsStatus: STATUS;
  isDivisionsStatus: STATUS;
  isDepartmentsStatus: STATUS;
};

export const initialState: LocationsState = {
  locations: [],
  divisions: [],
  departments: [],
  isLocationsStatus: STATUS.initial,
  isDivisionsStatus: STATUS.initial,
  isDepartmentsStatus: STATUS.initial,
};
