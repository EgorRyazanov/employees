import { createReducer } from '@reduxjs/toolkit';

import { STATUS } from '../../api/services/utils/status';
import { actions } from './actions';
import { initialState } from './initial';

export const reducer = createReducer(initialState, builder => {
  builder.addCase(actions.request, state => {
    state.status = STATUS.request;
  });
  builder.addCase(actions.success, (state, { payload }) => {
    state.status = STATUS.success;
    state.nodes = payload;
  });
  builder.addCase(actions.failure, state => {
    state.status = STATUS.failure;
  });
});
