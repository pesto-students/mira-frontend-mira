import { useState } from 'react';
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

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'app/firebase/firebaseConfig';

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
  const [loading, setLoading] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);

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

  const handleLoginSubmit = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Singed in user: ', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('An error occured: ', errorCode, errorMessage);
        setOpenErrorModal(true);
      })
      .finally(() => {
        setLoading(false);
      });
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
                loading={loading}
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
        title="Error: Invalid Credentials"
        description="Incorrect password or email does not exists! Please try again."
        open={openErrorModal}
        handleClose={() => setOpenErrorModal(false)}
      ></GenericErrorModal>
    </>
  );
};

export default Login;
