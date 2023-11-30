import { Checkbox, CheckboxProps, styled } from '@mui/material';

export const CheckBoxComponent = styled(Checkbox)<CheckboxProps>(() => ({
  '&': {
    color: '#14191A1F',
  },
}));
