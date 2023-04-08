import { useEffect } from 'react';
import { styled, CssBaseline } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useAppDispatch, useAppSelector } from './hooks';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
import { saveUser } from 'features/auth/authSlice';
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
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(saveUser(user));
        localStorage.setItem('token', (user as any).accessToken);
      } else {
        dispatch(saveUser(undefined));
      }
    });
  }, [auth, dispatch]);

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
