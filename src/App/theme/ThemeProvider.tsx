import React from 'react';
import { ThemeProvider } from '@mui/material/';
import { StylesProvider } from '@mui/styles';
import theme from './theme';

interface IProps {
  children: React.ReactNode;
}

const ThemeProviderWrapper: React.FC<IProps> = ({ children }) => {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
