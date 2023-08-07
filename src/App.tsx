import { useEffect } from 'react';
import { styled, CssBaseline } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useAppDispatch, useAppSelector } from 'hooks';
import { onAuthStateChangedListener } from '@/firebase/firebaseConfig';
import { saveFirebaseUser } from 'features/auth/authSlice';
import { SnackbarProvider, MaterialDesignContent } from 'notistack';
import router from './router';
import ThemeProvider from './theme/ThemeProvider';

const StyledSnackbarContent = styled(MaterialDesignContent)(({ theme }) => ({
  '&.notistack-MuiContent-success': {
    backgroundColor: theme.palette.success.main,
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: theme.palette.error.main,
  },
}));

const App = () => {
  const content = useRoutes(router);

  const dispatch = useAppDispatch();

  return (
    <SnackbarProvider
      Components={{
        success: StyledSnackbarContent,
        error: StyledSnackbarContent,
      }}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'bottom',
      }}
      autoHideDuration={3000}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider>
          <CssBaseline />
          {content}
        </ThemeProvider>
      </LocalizationProvider>
    </SnackbarProvider>
  );
};

export default App;
