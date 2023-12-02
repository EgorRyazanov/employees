import { createAction, createReducer } from '@reduxjs/toolkit';

const name = 'login';

export type LoginError = Error<Record<keyof LoginForm, string[]> | null>;

export type LoginState = {
  //временно для проверки
  data: UserData | null;
  error: LoginError;
  status: STATUS;
};

export const initialState: LoginState = {
  data: null,
  error: {
    error: '',
    payload: null,
  },
  status: STATUS.initial,
};

export const actions = {
  resetError: createAction<keyof LoginForm>(`${name}/resetError`),
  success: createAction<UserData>(`${name}/success`),
  request: createAction(`${name}/request`),
  failure: createAction<LoginError>(`${name}/failure`),
};

export const reducer = createReducer(initialState, builder => {
  builder.addCase(actions.request, state => {
    state.status = STATUS.request;
  });
  builder.addCase(actions.success, (state, { payload }) => {
    state.data = payload;
    state.status = STATUS.success;
    state.error = initialState.error;
  });
  builder.addCase(actions.failure, (state, { payload: error }) => {
    state.status = STATUS.failure;
    state.error = error;
  });
  builder.addCase(actions.resetError, (state, { payload: errorField }) => {
    state.error = {
      ...state.error,
      payload: {
        ...state.error?.payload,
        [errorField]: [],
      } as LoginError['payload'],
    };
  });
});
