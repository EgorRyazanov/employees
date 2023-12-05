import { FC } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

import { useAppSelector } from '../../hooks';
import { userSelectors } from '../../store/user/selectors';
import { RoutePaths } from '../routePaths';
import { Guard } from './types';

export const NonAuthGuard: FC<Guard> = ({ element }) => {
  const user = useAppSelector(userSelectors.SelectUser);
  const isLoading = useAppSelector(userSelectors.SelectIsUserLoading);
  const [search] = useSearchParams();

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (user != null) {
    const redirect = search.get('next') ?? RoutePaths.Main;
    return <Navigate to={redirect} replace />;
  }

  return element;
};
