import { FC } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

import { useAppSelector } from '../../hooks';
import { userSelectors } from '../../store/user/selectors';
import { RoutePaths } from '../routePaths';
import { Guard } from './types';

export const NonAuthGuard: FC<Guard> = ({ element }) => {
  const user = useAppSelector(userSelectors.SelectUser);
  const isLoading = useAppSelector(userSelectors.SelectIsUserLoading);
  const [search] = useSearchParams();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (user != null) {
    const redirect = search.get('next') ?? RoutePaths.MainView;
    return <Navigate to={redirect} replace />;
  }

  return element;
};
