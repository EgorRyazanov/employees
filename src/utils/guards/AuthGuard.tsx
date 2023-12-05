import { FC } from 'react';
import { Navigate, To, useLocation } from 'react-router-dom';

import { useAppSelector } from '../../hooks';
import { userSelectors } from '../../store/user/selectors';
import { RoutePaths } from '../routePaths';
import { Guard } from './types';

export const AuthGuard: FC<Guard> = ({ element }) => {
  const user = useAppSelector(userSelectors.SelectUser);
  const isLoading = useAppSelector(userSelectors.SelectIsUserLoading);
  const location = useLocation();

  const redirect: To = {
    pathname: RoutePaths.Login,
    search: new URLSearchParams({
      next: location.pathname,
    }).toString(),
  };

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (!user) {
    return <Navigate to={redirect} replace />;
  }

  return element;
};