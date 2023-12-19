import { FC } from 'react';
import { Navigate, To, useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

import { useAppSelector } from '../../hooks';
import { personSelectors } from '../../store/person/selectors';
import { RoutePaths } from '../routePaths';
import { Guard } from './types';

export const AuthGuard: FC<Guard> = ({ element }) => {
  const person = useAppSelector(personSelectors.SelectMe);
  const isLoading = useAppSelector(personSelectors.SelectIsMeLoading);
  const location = useLocation();

  const redirect: To = {
    pathname: RoutePaths.Login,
    search: new URLSearchParams({
      next: location.pathname,
    }).toString(),
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!person) {
    return <Navigate to={redirect} replace />;
  }

  return element;
};
