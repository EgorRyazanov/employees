import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
