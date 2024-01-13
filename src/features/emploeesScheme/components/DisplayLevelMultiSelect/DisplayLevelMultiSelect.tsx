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
import { FC, useCallback, useEffect, useState } from 'react';

import { CheckBoxComponent, TextFieldComponent } from '../../../../components';
import { typedMemo } from '../../../../utils/typedMemo';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { filtersSelectors } from '../../../../store/filters/selectors';
import { FiltersApi } from '../../../../api/services/filtersApi';
import { LevelDisplayedOptions } from './types';
import { Structure } from '../../../../models/structure';
import { FiltersStore } from '../../../../store/filters';
import { Division } from '../../../../models/division';
import { Action } from '../Filters/Filters';

interface DisplayLevelMultiSelectComponentProps {
  action?: Action;
  callback?: () => void;
}

const DisplayLevelMultiSelectComponent: FC<DisplayLevelMultiSelectComponentProps> = ({
  action = 'initial',
  callback,
}) => {
  const dispatch = useAppDispatch();
  const appliedLocation = useAppSelector(filtersSelectors.SelectLocation);

  const [isSelectVisible, setIsSelectVisible] = useState(false);
  const [options, setOptions] = useState<LevelDisplayedOptions[]>([]);

  useEffect(() => {
    const getOptions = async () => {
      if (appliedLocation != null && action !== 'touched') {
        const divisions = await FiltersApi.getDivisions(appliedLocation);
        const newOptions = divisions.map(division => {
          return {
            isVisible: false,
            isSelected: true,
            variant: action === 'initial' ? Structure.Division : Structure.Group,
            division,
          };
        });
        dispatch(FiltersStore.actions.changeFilterLevelDisplayed(newOptions));
        setOptions(newOptions);
      }
    };

    getOptions();
  }, [appliedLocation, action, dispatch]);

  const handleClickToggleSelect = useCallback(() => {
    setIsSelectVisible(!isSelectVisible);
  }, [isSelectVisible]);

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

  const handleChangeVariant = (id: Division['id'], variant: Structure) => {
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
    dispatch(FiltersStore.actions.changeShouldShowAllField(false));
    if (callback != null) {
      callback();
    }
    handleClickToggleSelect();
  };

  const closeSelect = useCallback(() => {
    if (isSelectVisible) {
      handleClickToggleSelect();
    }
  }, [handleClickToggleSelect, isSelectVisible]);

  useEffect(() => {
    window.addEventListener('click', closeSelect);
    return () => {
      window.removeEventListener('click', closeSelect);
    };
  }, [closeSelect]);

  return (
    <Box onClick={event => event.stopPropagation()} sx={{ position: 'relative' }}>
      <TextFieldComponent
        fullWidth
        placeholder="Уровень отображения"
        disabled={true}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>{isSelectVisible ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Box
        onClick={handleClickToggleSelect}
        sx={{
          position: 'absolute',
          inset: 0,
          '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#14191A',
            opacity: 0.05,
          },
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
                        onChange={event => handleChangeVariant(option.division.id, event.target.value as Structure)}>
                        {Structure.toArray().map((variant, index) => (
                          <FormControlLabel
                            key={index}
                            value={variant}
                            control={<Radio />}
                            label={Structure.toReadable(variant)}
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
