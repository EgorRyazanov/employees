import { createReducer } from '@reduxjs/toolkit';

import { actions } from './actions';
import { initialState } from './initial';

export const reducer = createReducer(initialState, builder => {
  builder.addCase(actions.removeNode, state => {
    state.node = null;
    state.isModalActive = false;
  });
  builder.addCase(actions.setNode, (state, { payload }) => {
    state.node = payload;
    state.isModalActive = true;
  });
});
