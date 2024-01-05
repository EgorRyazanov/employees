import {
  Box,
  Button,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';

import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { PersonsStore } from '../../../../store/persons';
import { personsSelectors } from '../../../../store/persons/selectors';
import { typedMemo } from '../../../../utils/typedMemo';
import { PAGE_SIZES } from '../../../../store/filters/initial';
import { filtersSelectors } from '../../../../store/filters/selectors';
import { FiltersStore } from '../../../../store/filters';
import { SortType } from '../../../../models/sortType';
import { PersonStore } from '../../../../store/person';
import { Person } from '../../../../models/person';
import { PersonModal } from '../PersonModal';
import { rowStyles, headerCellStyles } from './styles';

const PersonsViewTableComponent: FC = () => {
  const dispatch = useAppDispatch();
  const [hasPersonModalOpen, setHasPersonModalOpen] = useState(false);
  const isLoading = useAppSelector(personsSelectors.SelectIsPersonsLoading);
  const persons = useAppSelector(personsSelectors.SelectPersons);
  const filter = useAppSelector(filtersSelectors.SelectPersonsFilter);

  useEffect(() => {
    dispatch(PersonsStore.thunks.getPersons(filter));
  }, [dispatch, filter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handlePageChange = (_: unknown, page: number) => {
    scrollToTop();
    dispatch(FiltersStore.actions.changePersonsFilter({ ...filter, page: page + 1 }));
  };

  const handleItemsPerPageChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    scrollToTop();
    dispatch(FiltersStore.actions.changePersonsFilter({ ...filter, pageSize: Number(event.target.value), page: 0 }));
  };

  const handleClearFilters = () => {
    scrollToTop();
    dispatch(FiltersStore.actions.clearPersonsFilter());
  };

  const handlePersonClick = (personId: Person['id']) => {
    setHasPersonModalOpen(true);
    dispatch(PersonStore.thunks.getPersonDetails(personId));
  };

  const handleDropPerson = () => {
    setHasPersonModalOpen(false);
    dispatch(PersonStore.actions.dropPersonDetails());
  };

  return (
    <>
      {isLoading && <LinearProgress />}
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ border: '1px solid #000' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ border: '1px solid #000' }}>
                  <TableSortLabel
                    active={filter.fullName != null}
                    direction={filter.fullName === SortType.Ascending ? 'asc' : 'desc'}
                    onClick={() => {
                      dispatch(
                        FiltersStore.actions.changePersonsFilter({
                          ...filter,
                          fullName:
                            filter.fullName === SortType.Ascending
                              ? SortType.Descending
                              : filter.fullName === SortType.Descending
                              ? undefined
                              : SortType.Ascending,
                        }),
                      );
                    }}>
                    ФИО
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ border: '1px solid #000' }}>
                  <TableSortLabel
                    active={filter.userPosition != null}
                    direction={filter.userPosition === SortType.Ascending ? 'asc' : 'desc'}
                    onClick={() => {
                      dispatch(
                        FiltersStore.actions.changePersonsFilter({
                          ...filter,
                          userPosition:
                            filter.userPosition === SortType.Ascending
                              ? SortType.Descending
                              : filter.userPosition === SortType.Descending
                              ? undefined
                              : SortType.Ascending,
                        }),
                      );
                    }}>
                    № позиции
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ ...headerCellStyles }}>ЮЛ</TableCell>
                <TableCell sx={{ ...headerCellStyles }}>Локация</TableCell>
                <TableCell sx={{ ...headerCellStyles }}>Подразделение</TableCell>
                <TableCell sx={{ ...headerCellStyles }}>Отдел</TableCell>
                <TableCell sx={{ ...headerCellStyles }}>Группа</TableCell>
                <TableCell sx={{ ...headerCellStyles }}>Должность</TableCell>
                <TableCell sx={{ ...headerCellStyles }}>Тип работы</TableCell>
                <TableCell sx={{ ...headerCellStyles, width: '10%' }}>
                  <Button
                    onClick={handleClearFilters}
                    variant="outlined"
                    sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Typography sx={{ fontSize: '11px', textTransform: 'none', lineHeight: '16px' }}>
                      Сбросить фильтры
                    </Typography>
                    <CloseIcon sx={{ fontSize: '16px' }} />
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {persons?.users.map((person, index) => (
                <TableRow sx={{ ...rowStyles }} key={index}>
                  <TableCell align="center">{person.fullName}</TableCell>
                  <TableCell align="center">{person.userNumber}</TableCell>
                  <TableCell align="center">{person.legalEntity}</TableCell>
                  <TableCell align="center">{person.location}</TableCell>
                  <TableCell align="center">{person.division}</TableCell>
                  <TableCell align="center">{person.department}</TableCell>
                  <TableCell align="center">{person.group}</TableCell>
                  <TableCell align="center">{person.position}</TableCell>
                  <TableCell align="center">{person.workType}</TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => handlePersonClick(person.id)}
                      sx={{ textTransform: 'none' }}
                      variant="contained">
                      Подробнее <KeyboardArrowRightIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {persons != null && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <TablePagination
              rowsPerPageOptions={PAGE_SIZES}
              count={123}
              rowsPerPage={filter.pageSize}
              page={filter.page - 1}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleItemsPerPageChange}
              labelRowsPerPage="Строк на странице"
            />
          </Box>
        )}
        {hasPersonModalOpen && <PersonModal isOpened={hasPersonModalOpen} toggleModal={handleDropPerson} />}
      </Box>
    </>
  );
};

export const PersonsViewTable = typedMemo(PersonsViewTableComponent);
