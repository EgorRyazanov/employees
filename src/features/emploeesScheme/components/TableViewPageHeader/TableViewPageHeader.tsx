import { FC } from 'react';
import { Box, IconButton, InputAdornment, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';

import { TextFieldComponent } from '../../../../components';
import { typedMemo } from '../../../../utils/typedMemo';
import { useAppSelector } from '../../../../hooks';
import { personsSelectors } from '../../../../store/persons/selectors';

const TableViewPageHeaderComponent: FC = () => {
  const isReady = useAppSelector(personsSelectors.SelectIsPersonsReady);

  return (
    <Box sx={{ marginBottom: '24px' }}>
      <TextFieldComponent
        sx={{
          marginBottom: '8px',
          width: '300px',
        }}
        placeholder="Сотрудник"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton aria-label="search">
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {isReady && (
        <Typography variant="body2" sx={{ color: '#A8A19A' }}>
          Найдено: 0
        </Typography>
      )}
    </Box>
  );
};

export const TableViewPageHeader = typedMemo(TableViewPageHeaderComponent);
