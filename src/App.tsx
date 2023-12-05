import { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { LoginPage } from './features/auth/pages/LoginPage';
import { MainPage } from './features/emploeesScheme/pages/Main/MainPage';
import { AuthGuard } from './utils/guards/AuthGuard';
import { NonAuthGuard } from './utils/guards/nonAuthGuard';
import { RoutePaths } from './utils/routePaths';
import '/src/theme/index.scss';
import { useAppDispatch } from './hooks';
import { UserStore } from './store/user';

export const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(UserStore.thunks.getMe());
  }, [dispatch]);

  return (
    <Routes>
      <Route path={RoutePaths.Login} element={<NonAuthGuard element={<LoginPage />} />} />
      <Route path={RoutePaths.Main} element={<AuthGuard element={<MainPage />} />} />
    </Routes>
  );
};
