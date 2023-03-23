import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Grid,
  Typography,
} from '@mui/material';

import useFetch from 'hooks/useFetch';

const ListProjects = () => {
  const searchPath = 'api/v1/projects';
  const { data, isPending, error } = useFetch(searchPath, 'GET');
  const [projectList, setProjectList] = React.useState([]);

  useEffect(() => {
    if (data && !isPending) {
      setProjectList(data);
    }
  }, [isPending]);

  return (
    <Box sx={{ padding: 5, pt: 0 }}>
      <Typography variant="h5">List Projects</Typography>
      <List>
        {projectList.map((project) => (
          <ListItem key={project._id} button component="a" href={project._id}>
            <ListItemText primary={project.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ListProjects;
