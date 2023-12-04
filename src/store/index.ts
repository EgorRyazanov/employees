import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { LoginStore } from './auth';

const rootReducer = combineReducers({
  auth: LoginStore.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type TRootState = ReturnType<typeof rootReducer>;
export type TRootDispatch = typeof store.dispatch;
