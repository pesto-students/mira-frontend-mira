import React, { useState, useEffect } from 'react';
import { Link, Box, Grid, Typography } from '@mui/material';
import TextFieldWrapper from 'components/common/TextFieldWrapper';
import UploadImage from '../common/UploadImage';
import ButtonWrapper from '../common/ButtonWrapper';
import SearchMemberGlobal from 'components/common/SearchMemberGlobal';
import ViewMembers from 'components/common/ViewMembers';
import useFetch from 'hooks/useFetch';

const EditProject = ({ projectId }) => {
  const searchPath = `api/v1/projects/${projectId}`;
  const { data, isPending, error } = useFetch(searchPath, 'GET');
  const [projectDetails, setProjectDetails] = useState({});
  const [usersWithRole, setUsersWithRole] = useState([]);

  useEffect(() => {
    if (projectDetails) {
      const adminsWithRole =
        (projectDetails.admins &&
          projectDetails.admins.map((user) => {
            user.role = 'admin';
            return user;
          })) ||
        [];
      const usersWithRole =
        (projectDetails.users &&
          projectDetails.users.map((user) => {
            user.role = 'user';
            return user;
          })) ||
        [];
      const allUsersWithRole = adminsWithRole.concat(usersWithRole);
      console.log(allUsersWithRole);
      setUsersWithRole(allUsersWithRole);
    }
  }, [data]);

  useEffect(() => {
    if (data && !isPending) {
      setProjectDetails(data);
    }
  }, [isPending]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
  };

  const [newMembers, setNewMembers] = useState([]);

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{ padding: 5, pt: 0 }}
    >
      {JSON.stringify(newMembers)}
      <Typography variant="h5">Project Overview</Typography>
      <Grid container spacing={2} sx={{ marginTop: '24px' }}>
        <Grid container spacing={2} item xs={12}>
          <Grid item xs={6} alignItems="center" container>
            Project Logo:
          </Grid>
          <Grid item xs={6}>
            <UploadImage imageSrc={projectDetails.logo} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextFieldWrapper
            label={'Project Name'}
            value={projectDetails?.name}
          />
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
            value={projectDetails?.description}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <ViewMembers users={usersWithRole} />
            </Grid>
            <Grid item xs={12} md={6}>
              <SearchMemberGlobal onChange={setNewMembers} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={3}>
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
          Save changes
        </ButtonWrapper>
      </Grid>
    </Box>
  );
};

export default EditProject;
