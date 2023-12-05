import { createReducer } from '@reduxjs/toolkit';

import { STATUS } from '../../api/services/utils/status';
import { actions } from './actions';
import { initialState } from './initial';

export const reducer = createReducer(initialState, builder => {
  builder.addCase(actions.request, state => {
    state.status = STATUS.request;
  });
  builder.addCase(actions.success, (state, { payload: user }) => {
    state.user = user;
    state.status = STATUS.success;
    state.error = initialState.error;
  });
  builder.addCase(actions.failure, (state, { payload: error }) => {
    state.status = STATUS.failure;
    state.error = error;
  });
});
