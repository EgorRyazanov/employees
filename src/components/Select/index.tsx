import { Select, SelectProps, styled } from '@mui/material';

export const SelectComponent = styled(Select)<SelectProps>(() => ({
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#14191ab8',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#14191A3d',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#14191A1F',
  },
  '& .MuiSelect-select': {
    padding: '4px 8px',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: '#14191A0A',
      color: '#14191A',
    },
    '&:focus': {
      backgroundColor: 'white',
    },
  },
}));
