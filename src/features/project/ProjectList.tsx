import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Grid,
  Typography,
} from '@mui/material';

import { getProjectList } from 'api/api';

const ListProjects = () => {
  const [projectList, setProjectList] = React.useState([]);
  useEffect(() => {
    (async () => {
      const response = await getProjectList();
      if (response.status == 'success') {
        setProjectList(response.data.data);
      }
    })();
  }, []);

  return (
    <Box sx={{ padding: 5, pt: 0 }}>
      <Typography variant="h5">List Projects</Typography>
      <div>Hello there</div>
      <List>
        {projectList.map((project) => (
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
