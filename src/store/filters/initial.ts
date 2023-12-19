import { Location } from '../../models/location';

export type FiltersState = {
  location: Location | null;
};

export const initialState: FiltersState = {
  location: null,
};
