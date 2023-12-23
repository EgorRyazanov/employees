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
import { FC, useEffect, useState } from 'react';

import { CheckBoxComponent, TextFieldComponent } from '../../../../components';
import { typedMemo } from '../../../../utils/typedMemo';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { filtersSelectors } from '../../../../store/filters/selectors';
import { FiltersApi } from '../../../../api/services/filtersApi';
import { LevelDisplayedOptions } from './types';
import { StructureEnum } from '../../../../models/structure';
import { FiltersStore } from '../../../../store/filters';
import { Division } from '../../../../models/division';
import { Action } from '../Filters/Filters';

interface DisplayLevelMultiSelectComponentProps {
  action?: Action;
}

const DisplayLevelMultiSelectComponent: FC<DisplayLevelMultiSelectComponentProps> = ({ action = 'initial' }) => {
  const dispatch = useAppDispatch();
  const appliedLocation = useAppSelector(filtersSelectors.SelectLocation);

  const [isSelectVisible, setIsSelectVisible] = useState(false);
  const [options, setOptions] = useState<LevelDisplayedOptions[]>([]);

  useEffect(() => {
    const getOptions = async () => {
      if (appliedLocation != null) {
        const divisions = await FiltersApi.getDivisions(appliedLocation);
        const options = divisions.map(division => {
          return {
            isVisible: false,
            isSelected: true,
            variant: action === 'initial' ? StructureEnum.Division : StructureEnum.Group,
            division,
          };
        });
        setOptions(options);
        dispatch(FiltersStore.actions.changeFilterLevelDisplayed(options));
      }
    };

    getOptions();
  }, [appliedLocation, action, dispatch]);

  const handleClickToggleSelect = () => {
    setIsSelectVisible(!isSelectVisible);
  };

  const handleSelectLocation = (id: Division['id']) => {
    const copiedOptions = [...options];
    const selectedOption = copiedOptions.find(option => option.division.id === id);
    if (selectedOption != null) {
      setOptions(
        copiedOptions.map(option => {
          if (option.division.id === id) {
            return { ...option, isSelected: !option.isSelected };
          }

          return option;
        }),
      );
    }
  };

  const handleToggleLocation = (id: Division['id']) => {
    const copiedOptions = [...options];
    const selectedOption = copiedOptions.find(option => option.division.id === id);
    if (
      selectedOption != null &&
      ((!selectedOption.isSelected && selectedOption.isVisible) || selectedOption.isSelected)
    ) {
      setOptions(
        copiedOptions.map(option => {
          if (option.division.id === id) {
            return { ...option, isVisible: !option.isVisible };
          }

          return option;
        }),
      );
    }
  };

  const handleChangeVariant = (id: Division['id'], variant: StructureEnum) => {
    const copiedOptions = [...options];
    const selectedOption = copiedOptions.find(option => option.division.id === id);
    if (selectedOption != null && selectedOption.isSelected) {
      setOptions(
        copiedOptions.map(option => {
          if (option.division.id === id) {
            return { ...option, variant };
          }

          return option;
        }),
      );
    }
  };

  const handleSubmit = () => {
    dispatch(FiltersStore.actions.changeFilterLevelDisplayed(options));
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
      {isSelectVisible && options.length > 0 && (
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
                  onClick={() => handleSelectLocation(option.division.id)}
                  sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <IconButton
                    onClick={event => {
                      event.stopPropagation();
                      handleToggleLocation(option.division.id);
                    }}>
                    {option.isVisible ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                  <CheckBoxComponent checked={option.isSelected} />
                  <Typography>{option.division.name}</Typography>
                </Box>
                {option.isVisible && (
                  <Box sx={{ paddingLeft: '32px' }}>
                    <FormControl>
                      <RadioGroup
                        name={option.division.name}
                        value={option.variant}
                        onChange={event =>
                          handleChangeVariant(option.division.id, event.target.value as StructureEnum)
                        }>
                        {StructureEnum.toArray().map((variant, index) => (
                          <FormControlLabel
                            key={index}
                            value={variant}
                            control={<Radio />}
                            label={StructureEnum.toReadable(variant)}
                          />
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
