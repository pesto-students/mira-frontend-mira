import { useEffect } from 'react';
import { styled, CssBaseline } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useAppDispatch, useAppSelector } from 'App/hooks';
import { onAuthStateChangedListener } from 'App/firebase/firebaseConfig';
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

  // const user = useAppSelector((state) => state.auth.value);

  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChangedListener((user) => {
  //     console.log('Changed user');
  //     if (user) {
  //       const pickedUser = (({ accessToken, email, uid }) => ({
  //         accessToken,
  //         email,
  //         uid,
  //       }))(user);
  //       dispatch(saveFirebaseUser(pickedUser));
  //       localStorage.setItem('token', user.accessToken);
  //     } else {
  //       dispatch(saveFirebaseUser(undefined));
  //     }
  //   });
  //   return unsubscribe;
  // }, []);

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
