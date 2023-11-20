import { TextField, TextFieldProps, styled } from '@mui/material';

export const TextFieldComponent = styled(TextField)<TextFieldProps>(() => ({
  '& .MuiInputBase-input': {
    padding: '4px',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: '#14191A0A',
      color: '#14191A',
    },
    '&:focus': {
      backgroundColor: 'white',
    },
  },
  '& .MuiOutlinedInput-root': {
    '& .MuiInputBase-input:hover ~ fieldset': {
      borderColor: '#14191A3D',
    },
    '& .MuiInputBase-input:focus ~ fieldset, & .MuiInputBase-input:active ~ fieldset': {
      borderColor: '#14191AB8',
    },
  },
}));
