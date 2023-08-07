import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from 'ui/Header';

interface BaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        flex: 1,
        height: '100%',
      }}
    >
      <Header />
      {children || <Outlet />}
    </Box>
  );
};

export default BaseLayout;
