import { LevelDisplayedOptions } from '../../features/emploeesScheme/components/DisplayLevelMultiSelect/types';
import { ParamsOptions } from '../../features/emploeesScheme/components/ParamsOptionsMultiSelect/types';
import { Location } from '../../models/location';

export type FiltersState = {
  location: Location | null;
  filterLevelDisplayed: LevelDisplayedOptions[] | null;
  paramsOptions: ParamsOptions | null;
};

export const initialState: FiltersState = {
  location: null,
  filterLevelDisplayed: null,
  paramsOptions: null,
};
