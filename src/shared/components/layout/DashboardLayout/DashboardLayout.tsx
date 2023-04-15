import { ReactNode, FC, useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from 'react-router-dom';
import Sidebar from 'components/Sidebar/Sidebar';

import MenuIcon from '@mui/icons-material/Menu';
import { useWindowSize } from 'App/hooks';
interface DashboardLayoutProps {
  children?: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = () => {
  const [sideBarOpen, setSidebarOpen] = useState(false);
  const [sidebarVariant, setSidebarVariant] = useState('permanent');

  const handleSidebarOpen = (open) => {
    setSidebarOpen(open);
  };

  const [width, height] = useWindowSize();

  useEffect(() => {
    if (width < 900) {
      setSidebarVariant('temporary');
    } else {
      setSidebarVariant('permanent');
    }
  }, [width]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar
        open={sideBarOpen}
        variant={sidebarVariant}
        onClose={() => handleSidebarOpen(false)}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          maxWidth: '100%',
          overflow: 'hidden',
        }}
      >
        <Outlet />
      </Box>
      {sidebarVariant == 'temporary' ? (
        <Box
          component="div"
          sx={{ position: 'absolute', right: '30px', top: '20px' }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => handleSidebarOpen(true)}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
        </Box>
      ) : (
        ''
      )}
    </Box>
  );
};

export default DashboardLayout;
