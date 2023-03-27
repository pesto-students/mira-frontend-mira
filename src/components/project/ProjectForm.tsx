import { Box, Grid, Typography } from '@mui/material';
import UploadImage from '../common/UploadImage';
import SearchMemberGlobal from 'components/common/SearchMemberGlobal';
import Controls from 'components/controls/Controls';
import { useForm } from 'react-hook-form';
import { FC, useEffect } from 'react';

type FormData = {
  name?: string;
  description?: string;
  imageUrl?: string;
  admins?: any[];
  members?: any[];
  newMembers?: any[];
};

type IProjectForm = {
  initialValues: FormData;
  onSubmit: () => unknown;
};

const ProjectForm: FC<IProjectForm> = ({ initialValues, onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<FormData>({ mode: 'onChange', defaultValues: initialValues });
  const imageUrl = watch('imageUrl');

  useEffect(() => {
    register('newMembers');
    register('imageUrl');
  }, []);

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ padding: 5, pt: 0 }}
      autoComplete="off"
    >
      <Typography variant="h5">Create Project</Typography>
      <Grid container spacing={2} sx={{ marginTop: '24px' }}>
        <UploadImage
          helperText="Please upload a photo or use the default"
          label="Project logo"
          imageUrl={imageUrl}
          onChange={(value) => setValue('imageUrl', value)}
        />
        <Grid item xs={12}>
          <Controls.Input
            {...register('name', { required: 'Name is required' })}
            error={errors.name ? true : false}
            helperText={errors.name?.message?.toString()}
            fullWidth
            label={'Project Name'}
          />
        </Grid>
        <Grid item xs={12}>
          <Controls.Input
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
          <SearchMemberGlobal
            name="newMembers"
            onChange={(value) => setValue('newMembers', value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Controls.Button
            type="submit"
            size="large"
            fullWidth
            text="Save"
            disabled={!isValid || !isDirty}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectForm;
