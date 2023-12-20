import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import { CheckBoxComponent, TextFieldComponent } from '../../../../components';
import { typedMemo } from '../../../../utils/typedMemo';

// const location = [
//   { name: 'bla', id: 1 },
//   { name: 'damn', id: 2 },
// ];
const variants = ['Отделы', 'Подразделения', 'Группы', 'Сотрудники'];

const mockOptions = [
  { location: { name: 'Гера', id: 1 }, variant: 'Подразделения', isSelected: true, isVisible: false },
  { location: { name: 'Афина', id: 2 }, variant: 'Подразделения', isSelected: true, isVisible: false },
  { location: { name: 'Геракл', id: 3 }, variant: 'Подразделения', isSelected: true, isVisible: false },
];

const DisplayLevelMultiSelectComponent = () => {
  const [isSelectVisible, setIsSelectVisible] = useState(false);
  const [options, setOptions] = useState(mockOptions);

  const handleClickToggleSelect = () => {
    setIsSelectVisible(!isSelectVisible);
  };

  const handleSelectLocation = (id: number) => {
    const copiedOptions = [...options];
    const selectedOption = copiedOptions.find(option => option.location.id === id);
    if (selectedOption != null) {
      selectedOption.isSelected = !selectedOption.isSelected;
      setOptions(copiedOptions);
    }
  };

  const handleToggleLocation = (id: number) => {
    const copiedOptions = [...options];
    const selectedOption = copiedOptions.find(option => option.location.id === id);
    if (
      selectedOption != null &&
      ((!selectedOption.isSelected && selectedOption.isVisible) || selectedOption.isSelected)
    ) {
      selectedOption.isVisible = !selectedOption.isVisible;
      setOptions(copiedOptions);
    }
  };

  const handleChangeVariant = (id: number, variant: string) => {
    const copiedOptions = [...options];
    const selectedOption = copiedOptions.find(option => option.location.id === id);
    if (selectedOption != null && selectedOption.isSelected) {
      selectedOption.variant = variant;
      setOptions(copiedOptions);
    }
  };

  const handleSubmit = () => {
    handleClickToggleSelect();
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <TextFieldComponent
        fullWidth
        placeholder="Уровень отображения"
        disabled={true}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickToggleSelect}>
                {isSelectVisible ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {isSelectVisible && (
        <Box
          sx={{
            position: 'absolute',
            zIndex: 100,
            left: 0,
            right: 0,
            top: '110%',
            backgroundColor: '#ffffff',
            borderRadius: '4px',
            boxShadow: '7px 12px 10px 0px rgba(154, 154, 154, 0.25)',
            padding: '4px 12px',
          }}>
          <Box sx={{ overflowY: 'auto', maxHeight: '430px' }}>
            {options.map((option, index) => (
              <Box key={index}>
                <Box
                  onClick={() => handleSelectLocation(option.location.id)}
                  sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <IconButton
                    onClick={event => {
                      event.stopPropagation();
                      handleToggleLocation(option.location.id);
                    }}>
                    {option.isVisible ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                  <CheckBoxComponent checked={option.isSelected} />
                  <Typography>{option.location.name}</Typography>
                </Box>
                {option.isVisible && (
                  <Box sx={{ paddingLeft: '32px' }}>
                    <FormControl>
                      <RadioGroup
                        name={option.location.name}
                        value={option.variant}
                        onChange={event => handleChangeVariant(option.location.id, event.target.value)}>
                        {variants.map((variant, index) => (
                          <FormControlLabel key={index} value={variant} control={<Radio />} label={variant} />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
          <Divider sx={{ mb: '8px' }} />
          <Button onClick={handleSubmit} fullWidth variant="contained">
            Применить
          </Button>
        </Box>
      )}
    </Box>
  );
};

export const DisplayLevelMultiSelect = typedMemo(DisplayLevelMultiSelectComponent);
