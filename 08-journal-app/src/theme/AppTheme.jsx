import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { purpleTheme } from './';

const AppTheme = ({children}) => {
  return (
    <ThemeProvider theme={purpleTheme}>
        <CssBaseline/>
        {children}
    </ThemeProvider>
  )
}

export default AppTheme
