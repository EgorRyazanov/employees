import { reducer } from './slice';
import { initialState } from './initial';
import { actions } from './actions';
import { thunks } from './thunks';

export const LocationsStore = { initialState, actions, reducer, thunks };
