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

export type RootState = ReturnType<typeof rootReducer>;
export type RootDispatch = typeof store.dispatch;

export function initStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    devTools: true,
  });
}

export type Store = ReturnType<typeof initStore>;
export const store = initStore();
