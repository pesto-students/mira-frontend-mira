import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Grid,
  Typography,
} from '@mui/material';

import { useGetProjectsQuery } from './projectApiSlice';

const ListProjects = () => {
  const {
    data: {
      data: { data: projects },
      results,
    },
  } = useGetProjectsQuery();

  return (
    <Box sx={{ padding: 5, pt: 0 }}>
      <Typography variant="h5">List Projects</Typography>
      <List>
        {projects.map((project) => (
          <ListItem
            key={project._id}
            button
            component="a"
            href={`${project._id}`}
          >
            <ListItemText primary={project.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ListProjects;
