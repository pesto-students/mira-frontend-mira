import React, { useState } from 'react';
import { Link, Box, Grid, Typography } from '@mui/material';
import TextFieldWrapper from 'components/common/TextFieldWrapper';
import UploadImage from '../common/UploadImage';
import ButtonWrapper from '../common/ButtonWrapper';
import SearchMemberGlobal from 'components/common/SearchMemberGlobal/SearchMemberGlobal';

const CreateProject = () => {
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
      <div>{}</div>
      <Typography variant="h5">Create Project</Typography>
      <Grid container spacing={2} sx={{ marginTop: '24px' }}>
        <Grid container item xs={12}>
          <Grid item xs={6} alignItems="center" container>
            Project Logo:
            <Typography variant="caption" sx={{ color: '#777' }}>
              (Use default or upload your own)
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <UploadImage />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldWrapper label={'Project Name'} />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextFieldWrapper
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
          <SearchMemberGlobal />
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
          Create Project
        </ButtonWrapper>
      </Grid>
    </Box>
  );
};

export default CreateProject;
