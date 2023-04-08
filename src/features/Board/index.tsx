import React, { useEffect } from 'react';
// import { Route, useRouteMatch, useHistory } from 'react-router-dom';

import Breadcrumbs from 'shared/components/Breadcrumbs';
import { Box, CircularProgress, useTheme, Backdrop } from '@mui/material';

import Header from './Header';
import Filters from './Filters';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchProject } from './BoardSlice';
// import Lists from './Lists';
// import IssueDetails from './IssueDetails';

import type { IProjectBoardProps as Props } from './types';
import PageError from 'shared/components/PageError';
import ProjectBoardLists from './Lists';

//! remove later
const project = {
  name: 'singularity 2.0',
  users: [
    {
      _id: '641414a2668355902630d0a3',
      firstName: 'boby',
      lastName: 'johnson',
      email: 'boaloysius+1@gmail.com',
      imageUrl: 'https://randomuser.me/api/portraits/men/60.jpg',
    },
    {
      _id: '641414a2668355902630d0a4',
      firstName: 'boby2',
      lastName: 'johnson2',
      email: 'boaloysius+1@gmail.com',
      imageUrl: 'https://randomuser.me/api/portraits/men/60.jpg',
    },
    {
      _id: '641414a2668355902630d0a5',
      firstName: 'boby',
      lastName: 'johnson3',
      email: 'boaloysius+1@gmail.com',
      imageUrl: 'https://randomuser.me/api/portraits/men/60.jpg',
    },
    {
      _id: '641414a2668355902630d0a6',
      firstName: 'boby',
      lastName: 'johnson3',
      email: 'boaloysius+1@gmail.com',
      imageUrl: 'https://randomuser.me/api/portraits/men/60.jpg',
    },
    {
      _id: '641414a2668355902630d0a7',
      firstName: 'boby',
      lastName: 'johnson3',
      email: 'boaloysius+1@gmail.com',
      imageUrl: 'https://randomuser.me/api/portraits/men/60.jpg',
    },
  ],
};

const ProjectBoard: React.FC<Props> = () => {
  const theme = useTheme();

  const boardState = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProject());
  }, []);

  if (boardState.loading) {
    return (
      <Backdrop
        sx={{
          color: 'background.default',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (boardState.error) {
    return <PageError />;
  }

  return (
    <Box
      sx={{
        [theme.breakpoints.up('md')]: {
          ml: `${theme.sidebar.width}`,
        },
        padding: '25px 32px 50px',
      }}
    >
      <Breadcrumbs
        items={['Projects', boardState.project?.name, 'Kanban Board']}
      />
      <Header name="Kanban Board" />

      <Filters />
      <ProjectBoardLists />
      {/*
      <Route
        path={`${match.path}/issues/:issueId`}
        render={(routeProps) => (
          <Modal
            isOpen
            testid="modal:issue-details"
            width={1040}
            withCloseIcon={false}
            onClose={() => history.push(match.url)}
            renderContent={(modal) => (
              <IssueDetails
                issueId={routeProps.match.params.issueId}
                projectUsers={project.users}
                fetchProject={fetchProject}
                updateLocalProjectIssues={updateLocalProjectIssues}
                modalClose={modal.close}
              />
            )}
          />
        )}
      /> */}
    </Box>
  );
};

export default React.memo(ProjectBoard);
