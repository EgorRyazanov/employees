import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { LoginStore } from './auth';
import { UserStore } from './user';
import { NodesStore } from './node';
import { TransformOptionStore } from './transformOptions';

const rootReducer = combineReducers({
  auth: LoginStore.reducer,
  user: UserStore.reducer,
  nodes: NodesStore.reducer,
  transformOptions: TransformOptionStore.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export type TRootState = ReturnType<typeof rootReducer>;
export type TRootDispatch = typeof store.dispatch;
