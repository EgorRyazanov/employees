import { LevelDisplayedOptions } from '../features/emploeesScheme/components/DisplayLevelMultiSelect/types';
import { Location } from './location';

export interface NodesFilter {
  location: Location;
  displayedLevels: LevelDisplayedOptions[];
}
