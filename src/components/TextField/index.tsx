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
    '& .MuiInputBase-input ~ fieldset': {
      borderColor: '#14191A1F',
    },
    '& .MuiInputBase-input:active ~ fieldset': {
      borderColor: '#14191ab8',
    },
    '& .MuiInputBase-input:hover ~ fieldset': {
      borderColor: '#14191a3d',
    },
    '& .MuiInputBase-input:focus ~ fieldset': {
      borderColor: '#14191ab8',
    },
  },
  '& .MuiOutlinedInput-root:hover': {
    '& .MuiInputBase-input:focus ~ fieldset': {
      borderColor: '#14191ab8',
    },
  },
}));
