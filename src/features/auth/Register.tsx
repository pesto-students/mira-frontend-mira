import React, { useState } from 'react';
import {
  FormControlLabel,
  Checkbox,
  Box,
  Grid,
  Typography,
} from '@mui/material';
import TextFieldWrapper from 'shared/components/TextFieldWrapper';
import UploadImage from 'shared/components/UploadImage';
import ButtonWrapper from 'shared/components/ButtonWrapper';
import LinkWrapper from 'shared/components/LinkWrapper';
import DatePickerWrapper from 'shared/components/DatePickerWrapper/DatePickerWrapper';
import { IcustomEventObj } from 'shared/types';
import GenericErrorModal from 'shared/components/Modal/GenericErrorModal';
import { request } from 'App/axios';
import { format } from 'date-fns';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';

interface IRegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dob: Date;
  confirmPassword: string;
}

const Register = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [registerData, setRegisterData] = useState<IRegisterData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dob: new Date(),
    confirmPassword: '',
  });

  const handleChange = (
    e: React.BaseSyntheticEvent | IcustomEventObj<Date | string | File>,
  ) => {
    const [value, name] = [
      e.target.type === 'checkbox' ? e.target.checked : e.target.value,
      e.target.name,
    ];
    setRegisterData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage('');
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    const data = {
      ...registerData,
      dob: format(registerData.dob, 'yyyy-MM-dd'),
    };
    console.log(data);
    if (!isFormValid()) return;

    try {
      setLoading(true);
      const res = await request.post('/auth/signup', data);
      console.log(res);
      enqueueSnackbar('Signed in successfully! Please login to continue.', {
        variant: 'success',
      });
      // TODO: redirect to /login page
    } catch (error) {
      console.log('/auth/signup', error);
      // TODO: check all firebase errors and display
      setErrorMessage((error as AxiosError).response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    if (registerData.password !== registerData.confirmPassword) {
      setErrorMessage('Passwords dont match!');
      return false;
    }
    for (const key in registerData) {
      if (!registerData[key]) {
        setErrorMessage('Missing required fields!');
        return false;
      }
    }
    if (registerData.password.length < 6) {
      setErrorMessage('Password should be atleast 6 characters');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  return (
    <>
      <Box sx={{ padding: 5, pt: 0 }}>
        <Typography variant="h5">Create Account</Typography>
        <Grid container spacing={2} sx={{ marginTop: '24px' }}>
          <Grid container item xs={12}>
            <Grid item xs={6} alignItems="center" container>
              Profile Picture:
              <Typography variant="caption" sx={{ color: '#777' }}>
                (Use default or upload your own)
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <UploadImage
                onImageChange={(file) =>
                  handleChange({
                    target: {
                      name: 'avatar',
                      value: file,
                    },
                  })
                }
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldWrapper
              type="text"
              label={'First Name'}
              name="firstName"
              value={registerData.firstName}
              onChange={handleChange}
              required
              autoComplete="given-name"
              autoFocus
            ></TextFieldWrapper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldWrapper
              type="text"
              label={'Last Name'}
              name="lastName"
              value={registerData.lastName}
              onChange={handleChange}
              required
              autoComplete="family-name"
            ></TextFieldWrapper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldWrapper
              type="text"
              label={'Email'}
              name="email"
              value={registerData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            ></TextFieldWrapper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePickerWrapper
              label="Date of Birth"
              onChange={(val) =>
                handleChange({
                  target: {
                    name: 'dob',
                    value: val,
                  },
                })
              }
              value={registerData.dob}
              disableFuture
              format="dd/MM/yyyy"
            />
          </Grid>
          <Grid item xs={6}>
            <TextFieldWrapper
              required
              fullWidth
              name="password"
              label="Password"
              value={registerData.password}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={6}>
            <TextFieldWrapper
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              value={registerData.confirmPassword}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Show passwords"
              onChange={() => setShowPassword((prev) => !prev)}
            />
          </Grid>
        </Grid>
        {errorMessage && (
          <Grid>
            <Typography
              sx={{ color: 'red' }}
            >{`Error: ${errorMessage}`}</Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <ButtonWrapper
            variant="contained"
            onClick={handleSubmit}
            size="large"
            fullWidth
            loading={loading}
          >
            Create Account
          </ButtonWrapper>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <LinkWrapper href="/login">
              Already have an account? Sign in
            </LinkWrapper>
          </Grid>
        </Grid>
      </Box>
      <GenericErrorModal
        title="Error: Something went wrong! Please try again."
        open={openErrorModal}
        handleClose={() => setOpenErrorModal(false)}
      ></GenericErrorModal>
    </>
  );
};

export default Register;
