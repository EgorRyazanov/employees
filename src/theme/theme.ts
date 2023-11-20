import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#14191A',
    },
    secondary: {
      main: '#A8A19A',
    },
    error: {
      main: '#F26651',
    },
  },
  typography: {
    fontFamily: [
      'Grtsk Exa Bkslnt',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
