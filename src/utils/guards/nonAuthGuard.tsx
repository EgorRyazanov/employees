import { FC } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

import { useAppSelector } from '../../hooks';
import { personSelectors } from '../../store/person/selectors';
import { RoutePaths } from '../routePaths';
import { Guard } from './types';

export const NonAuthGuard: FC<Guard> = ({ element }) => {
  const person = useAppSelector(personSelectors.SelectMe);
  const isLoading = useAppSelector(personSelectors.SelectIsMeLoading);
  const [search] = useSearchParams();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (person != null) {
    const redirect = search.get('next') ?? RoutePaths.MainView;
    return <Navigate to={redirect} replace />;
  }

  return element;
};
