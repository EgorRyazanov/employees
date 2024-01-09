import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { LoginStore } from './auth';
import { PersonStore } from './person';
import { NodesStore } from './node';
import { TransformOptionStore } from './transformOptions';
import { FiltersStore } from './filters';
import { PersonsStore } from './persons';
import { LocationsStore } from './locations';
import { NodeDetailsStore } from './nodeDetails';

const rootReducer = combineReducers({
  auth: LoginStore.reducer,
  person: PersonStore.reducer,
  nodes: NodesStore.reducer,
  filters: FiltersStore.reducer,
  transformOptions: TransformOptionStore.reducer,
  persons: PersonsStore.reducer,
  locations: LocationsStore.reducer,
  nodeDetails: NodeDetailsStore.reducer,
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
