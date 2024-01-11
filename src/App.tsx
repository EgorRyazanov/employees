import { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from './components';
import { LoginPage } from './features/auth/pages/LoginPage';
import { MainPage } from './features/emploeesScheme/pages/MainView';
import { TableViewPage } from './features/emploeesScheme/pages/TableView';
import { useAppDispatch } from './hooks';
import { PersonStore } from './store/person';
import { AuthGuard } from './utils/guards/AuthGuard';
import { NonAuthGuard } from './utils/guards/nonAuthGuard';
import { RoutePaths } from './utils/routePaths';
import { setupInterceptors } from './api/http';
import { store } from './store';
import '/src/theme/index.scss';

export const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setupInterceptors(store);
  }, []);

  useEffect(() => {
    dispatch(PersonStore.thunks.getMe());
  }, [dispatch]);

  return (
    <Routes>
      <Route path={RoutePaths.Login} element={<NonAuthGuard element={<LoginPage />} />} />
      <Route path="/" element={<AuthGuard element={<Layout />} />}>
        <Route path={RoutePaths.MainView} element={<MainPage />} />
        <Route path={RoutePaths.TableView} element={<TableViewPage />} />
      </Route>
    </Routes>
  );
};
