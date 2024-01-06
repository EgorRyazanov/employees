import { createReducer } from '@reduxjs/toolkit';

import { STATUS } from '../../api/services/utils/status';
import { actions } from './actions';
import { initialState } from './initial';

export const reducer = createReducer(initialState, builder => {
  builder.addCase(actions.requestGettingMe, state => {
    state.statusMe = STATUS.request;
  });
  builder.addCase(actions.successGettingMe, (state, { payload: user }) => {
    state.me = user;
    state.statusMe = STATUS.success;
    state.errorMe = initialState.errorMe;
  });
  builder.addCase(actions.failureGettingMe, (state, { payload: error }) => {
    state.statusMe = STATUS.failure;
    state.errorMe = error;
  });
  builder.addCase(actions.requestGettingPersonDetails, state => {
    state.statusPersonDetails = STATUS.request;
  });
  builder.addCase(actions.successGettingPersonDetails, (state, { payload: user }) => {
    state.personDetails = user;
    state.statusPersonDetails = STATUS.success;
    state.errorPersonDetails = initialState.errorPersonDetails;
  });
  builder.addCase(actions.failureGettingPersonDetails, (state, { payload: error }) => {
    state.statusPersonDetails = STATUS.failure;
    state.errorPersonDetails = error;
  });
  builder.addCase(actions.dropPersonDetails, state => {
    state.personDetails = null;
    state.personNode = null;
  });
  builder.addCase(actions.requestGettingPersonNode, state => {
    state.statusPersonNode = STATUS.request;
  });
  builder.addCase(actions.successGettingPersonNode, (state, { payload: user }) => {
    state.personNode = user;
    state.statusPersonNode = STATUS.success;
    state.errorPersonNode = initialState.errorPersonNode;
  });
  builder.addCase(actions.failureGettingPersonNode, (state, { payload: error }) => {
    state.statusPersonNode = STATUS.failure;
    state.errorPersonNode = error;
  });
});
