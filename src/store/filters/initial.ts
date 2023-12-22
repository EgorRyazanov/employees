import { LevelDisplayedOptions } from '../../features/emploeesScheme/components/DisplayLevelMultiSelect/types';
import { Location } from '../../models/location';

export type FiltersState = {
  location: Location | null;
  filterLevelDisplayed: LevelDisplayedOptions[] | null;
};

export const initialState: FiltersState = {
  location: null,
  filterLevelDisplayed: null,
};
