import { TextField, TextFieldProps, styled } from '@mui/material';

export const TextFieldComponent = styled(TextField)<TextFieldProps>(() => ({
  '& .MuiInputBase-input': {
    padding: '4px',
    borderRadius: '4px',
    '&:hover': {
      cursor: 'pointer',
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
      backgroundColor: '#14191A0A',
    },
    '& .MuiInputBase-input:focus ~ fieldset': {
      borderColor: '#14191ab8',
    },
    '& .MuiInputAdornment-root .MuiButtonBase-root:hover': {
      backgroundColor: 'transparent',
    },
  },
  '& .Mui-error': {
    '& .MuiInputBase-input ~ fieldset': {
      borderColor: '#f26651',
    },
  },
  '& .MuiOutlinedInput-root:hover': {
    '& .MuiInputBase-input:focus ~ fieldset': {
      borderColor: '#14191ab8',
    },
  },
}));
