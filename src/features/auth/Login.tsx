import { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ButtonWrapper from 'shared/components/ButtonWrapper';
import TextFieldWrapper from 'shared/components/TextFieldWrapper';
import LinkWrapper from 'shared/components/LinkWrapper';
import GenericErrorModal from 'shared/components/Modal/GenericErrorModal';
import ResetPassword from './ResetPassword';
import { useAppDispatch, useAppSelector } from 'hooks';
import { userLogin } from './authAction';
import { setError as setAuthError, setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';
import { useNavigate } from 'react-router-dom';

interface ILoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const isValidEmail = (email) =>
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email,
  );

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState<ILoginData>({
    email: 'user1@pestoproject.com',
    password: 'password1234',
    rememberMe: false,
  });
  const navigate = useNavigate();
  const [resetPassword, setResetPassword] = useState(false);
  const [error, setError] = useState(null);

  const { loading: isLoadingFirebaseLogin, error: errorFirebaseLogin } =
    useAppSelector((state) => state.auth);

  const [
    login,
    { isLoading: isLoadingPlatformLogin, error: errorPlatformLogin },
    result,
  ] = useLoginMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    setError(errorFirebaseLogin || errorPlatformLogin);
  }, [errorFirebaseLogin, errorPlatformLogin]);

  const handleChange = (e: React.BaseSyntheticEvent) => {
    const [value, name] = [
      e.target.type === 'checkbox' ? e.target.checked : e.target.value,
      e.target.name,
    ];
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const isLoginDisabled = () => {
    if (
      !loginData.email ||
      !isValidEmail(loginData.email) ||
      !loginData.password
    )
      return true;
    return false;
  };

  const handleLoginSubmit = async () => {
    try {
      const response = await dispatch(
        userLogin({ email: loginData.email, password: loginData.password }),
      );
      if (!response.error) {
        const userData = await login({}).unwrap();
        await dispatch(setCredentials({ ...userData.data.user }));
        localStorage.setItem('userInfo', JSON.stringify(userData.data.user));
        navigate('/projects');
      }
    } catch (e) {
      console.log({ e });
    }
  };

  return (
    <>
      <Box sx={{ padding: 5 }}>
        <Typography variant="h5">Login</Typography>
        <Grid spacing={2} sx={{ marginTop: '24px' }} container>
          <Grid item xs={12}>
            <TextFieldWrapper
              type="email"
              label="Email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              required
              autoFocus
            ></TextFieldWrapper>
          </Grid>
          <Grid item xs={12}>
            <TextFieldWrapper
              label="Password"
              name="password"
              value={loginData.password}
              required
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleLoginSubmit();
                }
              }}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      disableRipple={true}
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextFieldWrapper>
          </Grid>
          <Grid item container>
            <FormControlLabel
              control={
                <Checkbox
                  name="rememberMe"
                  onChange={handleChange}
                  color="primary"
                  required
                />
              }
              label="Remember me"
            />
          </Grid>
          <Grid item xs={12}>
            {
              <ButtonWrapper
                variant="contained"
                disableElevation
                loading={isLoadingFirebaseLogin || isLoadingPlatformLogin}
                size="large"
                fullWidth
                sx={{
                  margin: '10px 0px',
                  padding: '10px',
                }}
                disabled={isLoginDisabled()}
                onClick={handleLoginSubmit}
              >
                Login
              </ButtonWrapper>
            }
            <Grid container justifyContent="space-between">
              <Grid item>
                <LinkWrapper href="/sign-up">Register</LinkWrapper>
              </Grid>
              <Grid item>
                <LinkWrapper onClick={() => setResetPassword(true)}>
                  Forgot password?
                </LinkWrapper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {resetPassword && (
        <ResetPassword onClose={() => setResetPassword(false)} />
      )}
      <GenericErrorModal
        title="Error"
        description={error}
        open={!!error}
        handleClose={() => {
          setError(null);
          dispatch(setAuthError(null));
        }}
      ></GenericErrorModal>
    </>
  );
};

export default Login;
