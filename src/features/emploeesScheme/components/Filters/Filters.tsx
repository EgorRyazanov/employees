import { Box, Button, MenuItem, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { SelectComponent } from '../../../../components';
import { NodeCities } from '../../../../models/nodeCities';
import { typedMemo } from '../../../../utils/typedMemo';

const FiltersComponent = () => {
  const [city, setCity] = useState<NodeCities>(NodeCities.Ekb);

  const handleCityChange = (event: SelectChangeEvent<unknown>) => {
    if (NodeCities.isNodeCity(event.target.value)) {
      setCity(event.target.value);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', padding: '24px 60px', gap: '16px' }}>
      <SelectComponent
        value={city}
        displayEmpty
        onChange={handleCityChange}
        sx={{ width: 200 }}
        IconComponent={props => <KeyboardArrowDownIcon {...props} />}>
        {NodeCities.toOptions().map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </SelectComponent>
      <Button variant="contained">Применить</Button>
    </Box>
  );
};

export const Filters = typedMemo(FiltersComponent);
