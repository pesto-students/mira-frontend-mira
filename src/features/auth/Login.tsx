import { useState } from 'react';
import {
  Grid,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ButtonWrapper from 'shared/components/ButtonWrapper';
import TextFieldWrapper from 'shared/components/TextFieldWrapper';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { saveUser } from './authSlice';
import LinkWrapper from 'shared/components/LinkWrapper';

interface ILoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState<ILoginData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e: React.BaseSyntheticEvent) => {
    const [value, name] = [
      e.target.type === 'checkbox' ? e.target.checked : e.target.value,
      e.target.name,
    ];
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const isLoginDisabled = () => {
    if (!loginData.email || !loginData.password) return true;
    return false;
  };

  const dispatch = useAppDispatch();

  const handleLoginSubmit = () => {
    dispatch(saveUser(loginData));
    console.log(loginData);
  };

  const user = useAppSelector((state) => state.auth.value);

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
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
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
            <ButtonWrapper
              variant="contained"
              disableElevation
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
            <Grid container justifyContent="space-between">
              <Grid item>
                <LinkWrapper href="/sign-up">Register</LinkWrapper>
              </Grid>
              <Grid item>
                <LinkWrapper href="/forgot-password">
                  Forgot password?
                </LinkWrapper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login;
