import { Box, Grid, Typography } from '@mui/material';
import { useForm, useFieldArray } from 'react-hook-form';
import { FC, useEffect, useState } from 'react';
import TextFieldWrapper from 'shared/components/TextFieldWrapper';
import ButtonWrapper from 'shared/components/ButtonWrapper';
import UploadImage from 'shared/components/UploadImage';
import SearchMembers from 'shared/components/SearchMembers/SearchMembers';
import ViewMembersTable from 'shared/components/ViewMembersTable/ViewMembersTable';

type FormData = {
  name?: string;
  description?: string;
  logo?: string;
  usersWithRole?: any[];
  newUsers?: any[];
};

type IProjectForm = {
  initialValues?: FormData;
  onSubmit: (finalData: {}, dirtyFields: string[]) => unknown;
  isCreateProject?: boolean;
  loading?: boolean;
};

const ProjectForm: FC<IProjectForm> = ({
  initialValues = {},
  onSubmit,
  isCreateProject = true,
  loading = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors, isValid, isDirty, dirtyFields },
  } = useForm<FormData>({ mode: 'onChange', defaultValues: initialValues });
  const imageUrl = watch('logo');
  const usersWithRole = watch('usersWithRole');
  const { fields: fieldsUsersWithRole, remove: removeUsersWithRole } =
    useFieldArray({
      control,
      name: 'usersWithRole', // unique name for your Field Array
    });

  useEffect(() => {
    register('newUsers');
    register('logo');
  }, []);

  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);

  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit((finalData) => {
          onSubmit(finalData, Object.keys(dirtyFields));
        })}
        sx={{ padding: 5, pt: 0 }}
        autoComplete="off"
      >
        <Typography variant="h5">
          {isCreateProject ? 'Create Project' : 'Project Overview'}
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
                  setValue('logo', value, { shouldDirty: true })
                }
                currentImage={imageUrl}
                path="projectLogo/"
                loading={loading}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <TextFieldWrapper
              {...register('name', { required: 'Name is required' })}
              error={errors.name ? true : false}
              helperText={errors.name?.message?.toString()}
              fullWidth
              label={'Project Name'}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldWrapper
              {...register('description', {
                required: 'Description is required',
              })}
              error={errors.description ? true : false}
              helperText={errors.description?.message?.toString()}
              fullWidth
              multiline
              rows={4}
              label={'Description'}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <SearchMembers
                  name="newUsers"
                  onChange={(value) =>
                    setValue('newUsers', value, { shouldDirty: true })
                  }
                />
              </Grid>
              {!isCreateProject ? (
                <Grid item xs={12}>
                  <ViewMembersTable
                    register={register}
                    fields={fieldsUsersWithRole}
                    remove={removeUsersWithRole}
                    watch={watch}
                  />
                </Grid>
              ) : (
                ''
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <ButtonWrapper
              type="submit"
              variant="contained"
              disableElevation
              loading={loading}
              size="large"
              fullWidth
              sx={{
                margin: '10px 0px',
                padding: '10px',
              }}
              disabled={!isValid || !isDirty}
            >
              {isCreateProject ? 'Create' : 'Save'}
            </ButtonWrapper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProjectForm;
