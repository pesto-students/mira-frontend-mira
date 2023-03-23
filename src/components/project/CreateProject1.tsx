import React, { useState } from 'react';
import { Link, Box, Grid, Typography } from '@mui/material';
import UploadImage from '../common/UploadImage';
import ButtonWrapper from '../common/ButtonWrapper';
import SearchMemberGlobal from 'components/common/SearchMemberGlobal';
import Controls from 'components/controls/Controls';

const initialValues = {
  name: 'New project',
  description: 'Project description',
  imageUrl: 'https://source.unsplash.com/random',
  members: [],
};

const CreateProject = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
  };

  const [values, setValues] = useState(initialValues);
  const [newMembers, setNewMembers] = useState([]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
  };
  // const onChangeHandler = (name) => {
  //   return (e) => {
  //     const { value } = e.target;
  //     console.log(name, value);
  //   };
  // };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{ padding: 5, pt: 0 }}
    >
      <Typography variant="h5">Create Project</Typography>
      <Grid container spacing={2} sx={{ marginTop: '24px' }}>
        <UploadImage
          value={values.imageUrl}
          name="imageUrl"
          label="Project logo"
          helperText="Use default or upload your own"
          onChange={onChangeHandler}
        />
        <Grid item xs={12}>
          <Controls.Input
            name="name"
            value={values.name}
            onChange={onChangeHandler}
            required
            label={'Project Name'}
          />
        </Grid>
        <Grid item xs={12}>
          <Controls.Input
            value={values.description}
            onChange={onChangeHandler}
            required
            multiline
            rows={4}
            maxRows={4}
            fullWidth
            name="description"
            label={'Description'}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <SearchMemberGlobal onChange={setNewMembers} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Controls.Button type="submit" size="large" fullWidth text="Create" />
      </Grid>
    </Box>
  );
};

export default CreateProject;
