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
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f6f6f4',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: 'transparent',
            width: 4,
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#14191A33',
            border: 'none',
          },
        },
      },
    },
  },
});

theme.typography.body2 = {
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: '133%',
  letterSpacing: '0.12px',
};
