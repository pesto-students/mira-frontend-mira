import { ReactNode, FC, useEffect } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Sidebar from 'components/Sidebar/Sidebar';
import { useAppSelector } from 'App/hooks';
import { useGetProjectsQuery } from 'features/project/projectApiSlice';
interface DashboardLayoutProps {
  children?: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = () => {
  // const { userInfo } = useAppSelector((state) => state.auth);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!userInfo) {
  //     navigate('/login');
  //   }
  // }, []);
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
