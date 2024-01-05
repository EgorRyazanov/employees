import { LevelDisplayedOptions } from '../../features/emploeesScheme/components/DisplayLevelMultiSelect/types';
import { ParamsOptions } from '../../features/emploeesScheme/components/ParamsOptionsMultiSelect/types';
import { Location } from '../../models/location';
import { PersonsFilter } from '../../models/personsFIlter';

export const PAGE_SIZES = [25, 50];

export type FiltersState = {
  location: Location | null;
  filterLevelDisplayed: LevelDisplayedOptions[] | null;
  paramsOptions: ParamsOptions | null;
  shouldShowAllNodeFields: boolean;
  persons: PersonsFilter;
};

export const initialState: FiltersState = {
  location: null,
  shouldShowAllNodeFields: false,
  filterLevelDisplayed: null,
  paramsOptions: null,
  persons: {
    page: 1,
    pageSize: PAGE_SIZES[0],
  },
};
