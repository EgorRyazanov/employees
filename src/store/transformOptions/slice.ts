import { createReducer } from '@reduxjs/toolkit';

import { actions } from './actions';
import { initialState } from './initial';

export const reducer = createReducer(initialState, builder => {
  builder.addCase(actions.change, (state, { payload }) => {
    state.options = payload;
  });
});
