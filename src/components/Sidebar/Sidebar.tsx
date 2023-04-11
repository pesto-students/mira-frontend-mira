import { FC } from 'react';
import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Stack,
  styled,
  MenuItem,
  Avatar,
  IconButton,
  Button,
} from '@mui/material';

import { NavLink, useParams } from 'react-router-dom';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ProjectDropdown from './ProjectDropdown';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import AddIcon from '@mui/icons-material/Add';
import Logo from 'app/assets/logo.png';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { useAppDispatch, useAppSelector } from 'App/hooks';
import { useGetProjectsQuery } from 'features/project/projectApiSlice';

const ProjectMenuItem = styled(MenuItem)(({ theme }) => ({
  '& .MuiListItemIcon-root': {
    minWidth: '40px',
    marginLeft: '20px',
    color: '#1C2A4B',
  },
  '& .MuiTypography-root': {
    fontSize: '14.7px',
    color: '#1C2A4B',
  },
  '&.MuiMenuItem-root': { padding: '10px' },
  '.active & .MuiTypography-root': {
    color: '#1E46A0 !important',
  },
  '.active & .MuiListItemIcon-root': {
    color: '#1E46A0 !important',
  },
}));

const NavigationLink = (props) => {
  const StyledLink = styled(NavLink)`
    text-decoration: none;

    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
      text-decoration: none;
    }
  `;
  const { currentProject } = useAppSelector((state) => state.project);
  const { children, to, ...otherProps } = props;
  return (
    <StyledLink {...otherProps} to={`/projects/${currentProject._id}/${to}`}>
      {children}
    </StyledLink>
  );
};

const Sidebar: FC = () => {
  const dispatch = useAppDispatch();
  const drawerWidth = 293;

  const {
    data: projects,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProjectsQuery();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'row',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Stack
        sx={{ width: '64px', background: '#1E46A0' }}
        justifyContent="space-between"
      >
        <Button href="/" sx={{ marginTop: '16px' }}>
          <img src={Logo} alt="logo" height={30} />
        </Button>
        <IconButton
          sx={{ color: 'white', marginBottom: '16px' }}
          aria-label="signout"
          size="large"
          href="/logout"
        >
          <ExitToAppIcon fontSize="inherit" />
        </IconButton>
      </Stack>
      <Stack
        sx={{
          flexGrow: 1,
          background: '#F4F5F7',
          borderRight: '1px solid #DFE1E6',
        }}
      >
        <List>
          <ProjectDropdown />
          <NavigationLink to="dashboard">
            <ProjectMenuItem>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Kanban Board" />
            </ProjectMenuItem>
          </NavigationLink>
          <NavigationLink to="overview">
            <ProjectMenuItem>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Project Overview" />
            </ProjectMenuItem>
          </NavigationLink>
          <NavigationLink to="analytics">
            <ProjectMenuItem>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Analytics" />
            </ProjectMenuItem>
          </NavigationLink>
          <Divider
            component="li"
            sx={{
              borderColor: '#DFE1E5',
              marginLeft: '15px',
              marginRight: '15px',
            }}
          />
          <NavigationLink to="cards/create">
            <ProjectMenuItem>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Create Issue" />
            </ProjectMenuItem>
          </NavigationLink>
          <Divider
            component="li"
            sx={{
              borderColor: '#DFE1E5',
              marginLeft: '15px',
              marginRight: '15px',
            }}
          />
        </List>
      </Stack>
    </Drawer>
  );
};

export default Sidebar;
