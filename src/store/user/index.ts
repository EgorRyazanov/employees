import { thunks } from './thunks';
import { reducer } from './slice';
import { initialState } from './initial';
import { actions } from './actions';

export const UserStore = { initialState, actions, reducer, thunks };
