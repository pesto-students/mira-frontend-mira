import React, { useState } from 'react';
import {
  FormControlLabel,
  Checkbox,
  Link,
  Box,
  Grid,
  Typography,
} from '@mui/material';
import TextFieldWrapper from 'shared/components/TextFieldWrapper';
import UploadImage from 'shared/components/UploadImage';
import ButtonWrapper from 'shared/components/ButtonWrapper';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{ padding: 5, pt: 0 }}
    >
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
            <UploadImage />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldWrapper label={'First Name'} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldWrapper
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldWrapper
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldWrapper
            required
            fullWidth
            id="dateOfBirth"
            label="Date of Birth"
            name="dateOfBirth"
            autoComplete="family-name"
          />
          {/* <DatePicker
            label="Uncontrolled picker"
            defaultValue={dayjs('2022-04-17')}
          /> */}
        </Grid>
        <Grid item xs={6}>
          <TextFieldWrapper
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="new-password"
          />
        </Grid>
        <Grid item xs={6}>
          <TextFieldWrapper
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            autoComplete="new-password"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Show passwords"
            onChange={() => setShowPassword((prev) => !prev)}
          />
        </Grid>
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
            margin: '15px 0px',
            padding: '10px',
          }}
        >
          Create Account
        </ButtonWrapper>
      </Grid>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link
            href="/login"
            underline="none"
            variant="body1"
            sx={{
              '&:hover': {
                color: 'primary.dark',
              },
            }}
          >
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;
