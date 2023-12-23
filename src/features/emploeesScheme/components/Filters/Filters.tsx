import { Box, Button, MenuItem, SelectChangeEvent } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { SelectComponent } from '../../../../components';
import { typedMemo } from '../../../../utils/typedMemo';
import { FiltersApi } from '../../../../api/services/filtersApi';
import { Location } from '../../../../models/location';
import { useAppDispatch } from '../../../../hooks';
import { FiltersStore } from '../../../../store/filters';
import { DisplayLevelMultiSelect } from '../DisplayLevelMultiSelect';

export type Action = 'initial' | 'full';

const FiltersComponent = () => {
  const dispatch = useAppDispatch();
  const [action, setAction] = useState<Action>('initial');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [locations, setLocations] = useState<readonly Location[]>([]);

  const handleLocationChange = (event: SelectChangeEvent<unknown>) => {
    if (typeof event.target.value === 'string') {
      setSelectedLocation(event.target.value);
    }
  };

  const handleApplyLocationFilter = useCallback(() => {
    const appliedLocation = locations.find(location => location.name === selectedLocation);
    if (appliedLocation != null) {
      dispatch(FiltersStore.actions.changeLocation(appliedLocation));
    }
  }, [dispatch, locations, selectedLocation]);

  const onFullStructureClick = () => {
    setAction('full');
  };

  const onInitialStructureClick = () => {
    setAction('initial');
  };

  useEffect(() => {
    const getLocations = async () => {
      const filterLocations = await FiltersApi.getLocations();
      const initialLocation =
        filterLocations.find(location => location.name === 'Брусника.Екатеринбург') ?? filterLocations[0];
      setSelectedLocation(initialLocation.name);
      setLocations(filterLocations);
    };
    getLocations();
  }, []);

  useEffect(() => {
    handleApplyLocationFilter();
  }, [locations, handleApplyLocationFilter]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', padding: '24px 60px', gap: '16px' }}>
      <SelectComponent
        value={selectedLocation}
        displayEmpty
        disabled={locations.length === 0}
        onChange={handleLocationChange}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        renderValue={(value: any) => (value ? value : 'Выберете город')}
        sx={{ width: 250 }}
        IconComponent={props => <KeyboardArrowDownIcon {...props} />}>
        {locations.map(option => (
          <MenuItem key={option.id} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </SelectComponent>
      <DisplayLevelMultiSelect action={action} />
      <Button variant="outlined" sx={{ border: '1px solid #14191A1F' }} onClick={onInitialStructureClick}>
        Сбросить фильтры
      </Button>
      <Button
        variant="outlined"
        sx={{ border: '1px solid #14191A1F', marginLeft: 'auto' }}
        onClick={onFullStructureClick}>
        Развернуть структуру
      </Button>
    </Box>
  );
};

export const Filters = typedMemo(FiltersComponent);
