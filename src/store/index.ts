import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type TRootState = ReturnType<typeof rootReducer>;
export type TRootDispatch = typeof store.dispatch;
