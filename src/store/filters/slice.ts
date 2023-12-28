import { createReducer } from '@reduxjs/toolkit';

import { actions } from './actions';
import { initialState } from './initial';

export const reducer = createReducer(initialState, builder => {
  builder.addCase(actions.changeLocation, (state, { payload }) => {
    state.location = payload;
  });
  builder.addCase(actions.changeFilterLevelDisplayed, (state, { payload }) => {
    state.filterLevelDisplayed = payload;
  });
  builder.addCase(actions.changeOptionsParams, (state, { payload }) => {
    state.paramsOptions = payload;
  });
});