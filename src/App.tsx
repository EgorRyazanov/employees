import { FormControl, MenuItem, SelectChangeEvent, Theme, useTheme } from '@mui/material';
import React from 'react';
import { SelectComponent } from './components/Select';
import { TextFieldComponent } from './components/TextField';
import { CheckBoxComponent } from './components/Checkbox';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}
export const App = () => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <CheckBoxComponent />
      <FormControl sx={{ m: 1, width: 300 }}>
        <SelectComponent
          displayEmpty
          value={personName}
          onChange={handleChange}
          MenuProps={MenuProps}
          IconComponent={props => <KeyboardArrowDownIcon {...props} />}>
          {names.map(name => (
            <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
              {name}
            </MenuItem>
          ))}
        </SelectComponent>
      </FormControl>
      <TextFieldComponent></TextFieldComponent>
    </div>
  );
};
