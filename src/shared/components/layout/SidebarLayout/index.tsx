import { Box, styled, useTheme } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';

const Sidebar = styled('div')(
  ({ theme }) => `
  height: 100%;
  width: ${theme.sidebar.width};
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: ${theme.palette.secondary.main};
  overflow-x: hidden;
  padding-top: 20px;
`,
);

const SidebarLayout = () => {
  const theme = useTheme();

  return (
    <Box>
      <Box
        sx={{
          height: '100%',
          [theme.breakpoints.up('md')]: {
            width: `${theme.sidebar.width}`,
          },
          position: 'fixed',
          zIndex: '1',
          top: '0',
          left: '0',
          backgroundColor: 'secondary.main',
          overflowX: 'hidden',
          paddingTop: '20px',
        }}
      ></Box>
      <Outlet />
    </Box>
  );
};

export default SidebarLayout;
