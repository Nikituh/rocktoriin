import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes, StyledEngineProvider } from '@mui/material/styles';
let theme = createTheme();
theme = responsiveFontSizes(theme);

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StyledEngineProvider>
  </React.StrictMode >,
  document.getElementById('root')
);
