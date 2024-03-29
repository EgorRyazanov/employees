import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';

import { CheckBoxComponent, TextFieldComponent } from '../../../../components';
import { typedMemo } from '../../../../utils/typedMemo';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { filtersSelectors } from '../../../../store/filters/selectors';
import { Action } from '../Filters/Filters';
import { ParamsOptions } from './types';
import { NodeViews } from '../../../../models/nodeVIew';
import { EmployeeViews } from '../../../../models/employeeViews';
import { FiltersStore } from '../../../../store/filters';

interface ParamsOptionsMultiSelectComponentProps {
  action?: Action;
  callback?: () => void;
}

const initialValues: ParamsOptions = {
  nodeViews: NodeViews.toArray(),
  employeeViews: EmployeeViews.toArray(),
  isNodeVisible: false,
  isEmployeeVisible: false,
};

const ParamsOptionsMultiSelectComponent: FC<ParamsOptionsMultiSelectComponentProps> = ({
  action = 'initial',
  callback,
}) => {
  const dispatch = useAppDispatch();
  const appliedLocation = useAppSelector(filtersSelectors.SelectLocation);

  const [isSelectVisible, setIsSelectVisible] = useState(false);
  const [options, setOptions] = useState<ParamsOptions>(initialValues);

  useEffect(() => {
    if (action !== 'touched') {
      dispatch(FiltersStore.actions.changeOptionsParams(initialValues));
      setOptions(initialValues);
    }
  }, [appliedLocation, action, dispatch]);

  const handleClickToggleSelect = useCallback(() => {
    setIsSelectVisible(!isSelectVisible);
  }, [isSelectVisible]);

  const handleSubmit = () => {
    dispatch(FiltersStore.actions.changeOptionsParams(options));
    if (callback != null) {
      callback();
    }
    handleClickToggleSelect();
  };

  const handleNodeViewChange = (value: NodeViews) => {
    const option = options.nodeViews.indexOf(value);

    if (option !== -1) {
      const copiedNodeViews = [...options.nodeViews];
      copiedNodeViews.splice(option, 1);
      setOptions({ ...options, nodeViews: copiedNodeViews });
    } else {
      setOptions({ ...options, nodeViews: [...options.nodeViews, value] });
    }
  };

  const handleEmployeeViewChange = (value: EmployeeViews) => {
    const option = options.employeeViews.indexOf(value);

    if (option !== -1) {
      const copiedNodeViews = [...options.employeeViews];
      copiedNodeViews.splice(option, 1);
      setOptions({ ...options, employeeViews: copiedNodeViews });
    } else {
      setOptions({ ...options, employeeViews: [...options.employeeViews, value] });
    }
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
        placeholder="Параметры отображения"
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
            <Box>
              <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <IconButton
                  onClick={event => {
                    event.stopPropagation();
                    setOptions({ ...options, isNodeVisible: !options.isNodeVisible });
                  }}>
                  {options.isNodeVisible ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                <Typography>Подразделения/группы/отделы</Typography>
              </Box>
              {options.isNodeVisible && (
                <Box sx={{ paddingLeft: '32px' }}>
                  <FormControl>
                    <FormGroup>
                      {NodeViews.toArray().map((nodeView, index) => {
                        return (
                          <FormControlLabel
                            key={index}
                            control={
                              <CheckBoxComponent
                                onChange={() => handleNodeViewChange(nodeView)}
                                checked={options.nodeViews.includes(nodeView)}
                                value={nodeView}
                              />
                            }
                            label={NodeViews.toReadable(nodeView)}
                          />
                        );
                      })}
                    </FormGroup>
                  </FormControl>
                </Box>
              )}
              <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <IconButton
                  onClick={event => {
                    event.stopPropagation();
                    setOptions({ ...options, isEmployeeVisible: !options.isEmployeeVisible });
                  }}>
                  {options.isNodeVisible ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                <Typography>Сотрудники</Typography>
              </Box>
              {options.isEmployeeVisible && (
                <Box sx={{ paddingLeft: '32px' }}>
                  <FormControl>
                    <FormGroup>
                      {EmployeeViews.toArray().map((employeeView, index) => {
                        return (
                          <FormControlLabel
                            key={index}
                            control={
                              <CheckBoxComponent
                                onChange={() => handleEmployeeViewChange(employeeView)}
                                checked={options.employeeViews.includes(employeeView)}
                                value={employeeView}
                              />
                            }
                            label={EmployeeViews.toReadable(employeeView)}
                          />
                        );
                      })}
                    </FormGroup>
                  </FormControl>
                </Box>
              )}
            </Box>
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

export const ParamsOptionsMultiSelect = typedMemo(ParamsOptionsMultiSelectComponent);
