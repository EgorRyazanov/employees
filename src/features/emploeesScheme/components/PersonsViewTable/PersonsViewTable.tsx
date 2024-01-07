import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
  Box,
  Button,
  LinearProgress,
  MenuItem,
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

import { SelectComponent } from '../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { Person } from '../../../../models/person';
import { SortType } from '../../../../models/sortType';
import { FiltersStore } from '../../../../store/filters';
import { PAGE_SIZES } from '../../../../store/filters/initial';
import { filtersSelectors } from '../../../../store/filters/selectors';
import { LocationsStore } from '../../../../store/locations';
import { locationsSelectors } from '../../../../store/locations/selectors';
import { PersonStore } from '../../../../store/person';
import { PersonsStore } from '../../../../store/persons';
import { personsSelectors } from '../../../../store/persons/selectors';
import { typedMemo } from '../../../../utils/typedMemo';
import { PersonModal } from '../PersonModal';
import { headerCellStyles, rowStyles, selectStyles } from './styles';
import { STATUS } from '../../../../api/services/utils/status';

const PersonsViewTableComponent: FC = () => {
  const dispatch = useAppDispatch();
  const [hasPersonModalOpen, setHasPersonModalOpen] = useState(false);
  const isLoading = useAppSelector(personsSelectors.SelectIsPersonsLoading);
  const isPersonsReady = useAppSelector(personsSelectors.SelectIsPersonsReady);
  const persons = useAppSelector(personsSelectors.SelectPersons);
  const filter = useAppSelector(filtersSelectors.SelectPersonsFilter);
  const locations = useAppSelector(locationsSelectors.SelectLocations);
  const divisions = useAppSelector(locationsSelectors.SelectDivisions);
  const departments = useAppSelector(locationsSelectors.SelectDepartments);
  const locationsStatus = useAppSelector(locationsSelectors.SelectLocationsStatus);
  const divisionsStatus = useAppSelector(locationsSelectors.SelectDivisionsStatus);
  const departmentsStatus = useAppSelector(locationsSelectors.SelectDepartmentsStatus);

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

  useEffect(() => {
    dispatch(LocationsStore.thunks.getLocations());
  }, [dispatch]);

  useEffect(() => {
    dispatch(LocationsStore.thunks.getDivisions({ location: filter.locationName }));
  }, [dispatch, filter.locationName]);

  useEffect(() => {
    dispatch(LocationsStore.thunks.getDepartments({ location: filter.locationName, division: filter.divisionName }));
  }, [dispatch, filter.locationName, filter.divisionName]);

  return (
    <>
      {isLoading && <LinearProgress />}
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ border: '1px solid #000' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ ...headerCellStyles, width: '15%' }}>
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
                <TableCell sx={{ ...headerCellStyles, width: '10%' }}>
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
                <TableCell sx={{ ...headerCellStyles, width: '5%' }}>ЮЛ</TableCell>
                <TableCell sx={{ ...headerCellStyles, width: '10%' }}>
                  <SelectComponent
                    value={filter.locationName ?? ''}
                    displayEmpty
                    sx={{
                      ...selectStyles,
                    }}
                    fullWidth
                    disabled={locations.length === 0 && locationsStatus !== STATUS.success}
                    onChange={event => {
                      dispatch(
                        FiltersStore.actions.changePersonsFilter({
                          ...filter,
                          locationName: event.target.value as string,
                          divisionName: undefined,
                        }),
                      );
                    }}
                    renderValue={() => 'Локация'}
                    IconComponent={props => <KeyboardArrowDownIcon {...props} />}>
                    {locations.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </SelectComponent>
                </TableCell>
                <TableCell sx={{ ...headerCellStyles, width: '10%' }}>
                  <SelectComponent
                    value={filter.divisionName}
                    displayEmpty
                    sx={{
                      ...selectStyles,
                    }}
                    fullWidth
                    disabled={divisions.length === 0 && divisionsStatus !== STATUS.success}
                    onChange={event => {
                      dispatch(
                        FiltersStore.actions.changePersonsFilter({
                          ...filter,
                          divisionName: event.target.value as string,
                          departmentName: undefined,
                        }),
                      );
                    }}
                    renderValue={() => 'Подразделение'}
                    IconComponent={props => <KeyboardArrowDownIcon {...props} />}>
                    {divisions.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </SelectComponent>
                </TableCell>
                <TableCell sx={{ ...headerCellStyles, width: '10%' }}>
                  <SelectComponent
                    value={filter.departmentName}
                    displayEmpty
                    sx={{
                      ...selectStyles,
                    }}
                    fullWidth
                    disabled={departments.length === 0 && departmentsStatus !== STATUS.success}
                    onChange={event => {
                      dispatch(
                        FiltersStore.actions.changePersonsFilter({
                          ...filter,
                          departmentName: event.target.value as string,
                        }),
                      );
                    }}
                    renderValue={() => 'Отделы'}
                    IconComponent={props => <KeyboardArrowDownIcon {...props} />}>
                    {departments.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </SelectComponent>
                </TableCell>
                <TableCell sx={{ ...headerCellStyles, width: '10%' }}>Группа</TableCell>
                <TableCell sx={{ ...headerCellStyles, width: '10%' }}>Должность</TableCell>
                <TableCell sx={{ ...headerCellStyles, width: '10%' }}>Тип работы</TableCell>
                <TableCell sx={{ ...headerCellStyles, width: '10%' }}>
                  <Button
                    fullWidth
                    onClick={handleClearFilters}
                    variant="outlined"
                    sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Typography
                      sx={{ fontSize: '11px', textTransform: 'none', lineHeight: '16px', textWrap: 'nowrap' }}>
                      Сбросить фильтры
                    </Typography>
                    <CloseIcon sx={{ fontSize: '16px' }} />
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {persons?.items.map((person, index) => (
                <TableRow sx={{ ...rowStyles }} key={index}>
                  <TableCell align="center">{person.fullName}</TableCell>
                  <TableCell align="center">{person.userNumber}</TableCell>
                  <TableCell align="center">{person.legalEntity}</TableCell>
                  <TableCell align="center">{person.location !== '' ? person.location : 'Не указано'}</TableCell>
                  <TableCell align="center">{person.division !== '' ? person.division : 'Не указано'}</TableCell>
                  <TableCell align="center">{person.department !== '' ? person.department : 'Не указано'}</TableCell>
                  <TableCell align="center">{person.group !== '' ? person.group : 'Не указано'}</TableCell>
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
        {persons?.items.length === 0 && isPersonsReady && (
          <Typography sx={{ textAlign: 'center', paddingTop: '8px' }}>Ничего не найдено</Typography>
        )}
        {persons != null && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <TablePagination
              rowsPerPageOptions={PAGE_SIZES}
              count={persons.total}
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
