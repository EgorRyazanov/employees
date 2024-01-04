import { FC } from 'react';

import { typedMemo } from '../../../../utils/typedMemo';
import { Box } from '@mui/material';
import { TableViewPageHeader } from '../../components/TableViewPageHeader';

const TableViewComponent: FC = () => {
  return (
    <Box sx={{ padding: '24px 60px 0 60px' }}>
      <TableViewPageHeader />
    </Box>
  );
};

export const TableViewPage = typedMemo(TableViewComponent);
