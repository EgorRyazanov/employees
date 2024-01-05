import { FC, useEffect, useState } from 'react';
import { Box, IconButton, InputAdornment, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';

import { TextFieldComponent } from '../../../../components';
import { typedMemo } from '../../../../utils/typedMemo';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { personsSelectors } from '../../../../store/persons/selectors';
import { filtersSelectors } from '../../../../store/filters/selectors';
import { FiltersStore } from '../../../../store/filters';

const DELAY = 500;

const TableViewPageHeaderComponent: FC = () => {
  const dispatch = useAppDispatch();
  const isReady = useAppSelector(personsSelectors.SelectIsPersonsReady);
  const personsFilter = useAppSelector(filtersSelectors.SelectPersonsFilter);
  const persons = useAppSelector(personsSelectors.SelectPersons);

  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const timeOutId = setTimeout(() => setSearch(query), DELAY);
    return () => clearTimeout(timeOutId);
  }, [query]);

  useEffect(() => {
    dispatch(FiltersStore.actions.changePersonsFilter({ ...personsFilter }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, dispatch]);

  return (
    <Box sx={{ marginBottom: '24px' }}>
      <TextFieldComponent
        sx={{
          marginBottom: '8px',
          width: '300px',
        }}
        placeholder="Сотрудник"
        value={query}
        onChange={event => setQuery(event.target.value)}
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
      {persons == null && (
        <Typography variant="body2" sx={{ color: '#A8A19A' }}>
          Ничего не найдено
        </Typography>
      )}
      {isReady && (
        <Typography variant="body2" sx={{ color: '#A8A19A' }}>
          Найдено: 0
        </Typography>
      )}
    </Box>
  );
};

export const TableViewPageHeader = typedMemo(TableViewPageHeaderComponent);
