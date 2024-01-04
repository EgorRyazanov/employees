import { FC } from 'react';

import { typedMemo } from '../../../../utils/typedMemo';
import { Box } from '@mui/material';
import { TableViewPageHeader } from '../../components/TableViewPageHeader';
import { PersonsViewTable } from '../../components/PersonsViewTable/PersonsViewTable';

const TableViewComponent: FC = () => {
  return (
    <Box sx={{ padding: '24px 60px 0 60px' }}>
      <TableViewPageHeader />
      <PersonsViewTable />
    </Box>
  );
};

export const TableViewPage = typedMemo(TableViewComponent);
