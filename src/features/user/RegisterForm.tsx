import React, { useState, useEffect } from 'react';
import {
  FormControlLabel,
  Checkbox,
  Box,
  Grid,
  Typography,
} from '@mui/material';
import TextFieldWrapper from 'ui/TextFieldWrapper';
import UploadImage from 'ui/UploadImage';
import ButtonWrapper from 'ui/ButtonWrapper';
import LinkWrapper from 'ui/LinkWrapper';
import DatePickerWrapper from 'ui/DatePickerWrapper/DatePickerWrapper';
import { format } from 'date-fns';

import { useForm, Controller } from 'react-hook-form';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dob: string;
  confirmPassword: string;
  imageUrl: string;
};

const RegisterForm = ({ initialValues, isCreate, processing, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors, isValid, isDirty, dirtyFields },
  } = useForm<FormData>({ mode: 'onChange', defaultValues: initialValues });

  const imageUrl = watch('imageUrl');
  const password = watch('password');

  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);

  return (
    <>
      <Box
        sx={{ padding: 5, pt: 0 }}
        component="form"
        onSubmit={handleSubmit((finalData) => {
          onSubmit(finalData, Object.keys(dirtyFields));
        })}
      >
        <Typography variant="h5">
          {isCreate ? 'Create Account' : 'Update Account'}
        </Typography>
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
                onImageChange={(value) =>
                  setValue('imageUrl', value, { shouldDirty: true })
                }
                currentImage={imageUrl}
                path="profilePic/"
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldWrapper
              {...register('firstName', {
                required: 'First name is required',
                maxLength: {
                  value: 15,
                  message: 'First name can have max 15 characters',
                },
                validate: (value) =>
                  value?.trim() === value || 'No trailing spaces',
                pattern: {
                  value: /^[A-Za-z\s]+$/i,
                  message: 'Only english alphabets',
                },
              })}
              error={errors.firstName ? true : false}
              helperText={errors.firstName?.message?.toString()}
              autoFocus
              label={'First Name'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldWrapper
              {...register('lastName', {
                maxLength: {
                  value: 15,
                  message: 'Last name can have max 15 characters',
                },
                validate: (value) =>
                  value?.trim() === value || 'No trailing spaces',
                pattern: {
                  value: /^[A-Za-z\s]+$/i,
                  message: 'Only english alphabets',
                },
              })}
              error={errors.lastName ? true : false}
              helperText={errors.lastName?.message?.toString()}
              label={'Last Name'}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextFieldWrapper
              {...register('email', {
                required: 'Email Address is required',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
                  message: 'Please enter a valid email address',
                },
              })}
              disabled={!isCreate}
              error={errors.email ? true : false}
              helperText={errors.email?.message?.toString()}
              label={'Email'}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              control={control}
              name="dob"
              render={({ field: { onChange, value, ref } }) => (
                <DatePickerWrapper
                  label="Date of birth"
                  ref={ref}
                  value={new Date(value)}
                  onChange={(val) => {
                    onChange({
                      target: {
                        name: 'dob',
                        value: format(val, 'yyyy-MM-dd'),
                      },
                    });
                  }}
                  disableFuture
                  format="dd/MM/yyyy"
                />
              )}
            />
          </Grid>
          {isCreate ? (
            <>
              <Grid item xs={6}>
                <TextFieldWrapper
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 7,
                      message: 'Password should be atleast 7 charectors long',
                    },
                    validate: (value) =>
                      value?.trim() === value || 'No trailing spaces',
                  })}
                  error={errors.password ? true : false}
                  helperText={errors.password?.message?.toString()}
                  label={'Password'}
                  type={showPassword ? 'text' : 'password'}
                />
              </Grid>
              <Grid item xs={6}>
                <TextFieldWrapper
                  {...register('confirmPassword', {
                    required: 'Please confirm the password',
                    validate: (value) =>
                      value == password || "Password doesn't match",
                  })}
                  error={errors.confirmPassword ? true : false}
                  helperText={errors.confirmPassword?.message?.toString()}
                  label={'Confirm password'}
                  type={showPassword ? 'text' : 'password'}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Show passwords"
                  onChange={() => setShowPassword((prev) => !prev)}
                />
              </Grid>
            </>
          ) : (
            ''
          )}
        </Grid>
        <Grid item xs={12}>
          <ButtonWrapper
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            loading={processing}
            disabled={!isDirty || processing}
          >
            {isCreate ? 'Create Profile' : 'Update Profile'}
          </ButtonWrapper>
        </Grid>
        {isCreate ? (
          <Grid container justifyContent="flex-end">
            <Grid item>
              <LinkWrapper href="/login">
                Already have an account? Sign in
              </LinkWrapper>
            </Grid>
          </Grid>
        ) : (
          ''
        )}
      </Box>
    </>
  );
};

export default RegisterForm;
