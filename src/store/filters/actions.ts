import { createAction } from '@reduxjs/toolkit';
import { Location } from '../../models/location';
import { LevelDisplayedOptions } from '../../features/emploeesScheme/components/DisplayLevelMultiSelect/types';

const name = 'filters';

export const actions = {
  changeLocation: createAction<Location>(`${name}/changeLocation`),
  changeFilterLevelDisplayed: createAction<LevelDisplayedOptions[]>(`${name}/changeLevelDisplayed`),
};
