import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { FC } from 'react';

import { typedMemo } from '../../utils/typedMemo';
import { Header } from '../Header';

const LayoutComponent: FC = () => {
  return (
    <Box>
      <Header />
      <Outlet />
    </Box>
  );
};

export const Layout = typedMemo(LayoutComponent);
