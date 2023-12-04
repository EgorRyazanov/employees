import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Login } from './auth';

const rootReducer = combineReducers({
  auth: Login.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type TRootState = ReturnType<typeof rootReducer>;
export type TRootDispatch = typeof store.dispatch;
