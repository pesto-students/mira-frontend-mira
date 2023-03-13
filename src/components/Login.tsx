import { useState } from 'react';
import {
  Grid,
  Typography,
  Box,
  Link,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ButtonWrapper from './common/ButtonWrapper';
import TextFieldWrapper from './common/TextFieldWrapper';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

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
              autoFocus
            ></TextFieldWrapper>
          </Grid>
          <Grid item xs={12}>
            <TextFieldWrapper
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
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
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <FormControlLabel
              sx={{ width: '100%' }}
              control={<Checkbox value="remember" color="primary" />}
              label="I Agree to all the Terms and Privacy Policy"
            />
          </Grid>
          <Grid item xs={12}>
            <ButtonWrapper
              variant="contained"
              disableElevation
              onClick={() => {
                alert('clicked');
              }}
              size="large"
              fullWidth
              sx={{
                margin: '10px 0px',
                padding: '10px',
              }}
            >
              Login
            </ButtonWrapper>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Link
                  href="/sign-up"
                  underline="none"
                  variant="body1"
                  sx={{
                    '&:hover': {
                      color: 'primary.dark',
                    },
                  }}
                >
                  Register
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="/forgot-password"
                  underline="none"
                  variant="body1"
                  sx={{
                    '&:hover': {
                      color: 'primary.dark',
                    },
                  }}
                >
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login;
