import React from 'react';
import { ThemeProvider } from '@mui/material/';
import theme from './theme';

interface IProps {
  children: React.ReactNode;
}

const ThemeProviderWrapper: React.FC<IProps> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeProviderWrapper;
