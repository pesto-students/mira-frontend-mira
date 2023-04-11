import { MouseEvent, useEffect, useState } from 'react';
import {
  List,
  ListItemAvatar,
  Avatar,
  ListItemButton,
  Menu,
  MenuItem,
  ListItem,
  ListItemText,
  styled,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate, NavLink, useParams } from 'react-router-dom';
import { useGetProjectsQuery } from 'features/project/projectApiSlice';
import { useAppSelector, useAppDispatch } from 'App/hooks';
import { setCurrentProject } from 'features/project/projectSlice';

const MenuWrapper = styled(Menu)(({ theme }) => ({
  '& .MuiList-root': {
    background: '#F6F7FA',
  },
  '& .MuiList-root .Mui-selected': {
    backgroundColor: 'rgb(2 2 2 / 8%)',
  },
  '& .MuiTypography-root': { color: '#1C2A4B' },
}));

const SelectedProjectItem = styled(ListItem)(({ theme }) => ({
  '& .MuiListItemAvatar-root': {
    minWidth: '50px',
    marginLeft: '10px',
  },
}));

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

export default function ProjectDropdown() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const dispatch = useAppDispatch();

  const handleMenuItemClick = (
    event: MouseEvent<HTMLElement>,
    index: number,
  ) => {
    dispatch(setCurrentProject(projects[index]));
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    data: {
      data: { data: projects },
      results,
    },
  } = useGetProjectsQuery();

  const { currentProject } = useAppSelector((state) => state.project);
  console.log(currentProject);

  return (
    <>
      <List
        component="nav"
        aria-label="Switch Project"
        sx={{ marginBottom: '20px', fontSize: '14.7px' }}
      >
        <SelectedProjectItem
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="Project list"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
          sx={{
            '& .MuiListItemAvatar-root': { minWidth: '50px' },
          }}
          disablePadding
        >
          <ListItemButton>
            <ListItemAvatar>
              <Avatar
                alt={'selected-project-logo'}
                src={currentProject.logo}
                sx={{ width: 40, height: 40 }}
              />
            </ListItemAvatar>
            <ListItemText primary={currentProject.name} />
            <ExpandMoreIcon />
          </ListItemButton>
        </SelectedProjectItem>
      </List>
      <MenuWrapper
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {projects.map((option, index) => (
          <StyledLink
            key={option._id}
            to={`/projects/${option._id}/overview`}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            <MenuItem
              selected={option._id === currentProject._id}
              sx={{
                paddingTop: '10px',
                paddingBottom: '10px',
              }}
            >
              <ListItemAvatar sx={{ minWidth: '40px' }}>
                <Avatar
                  alt={'project-logo'}
                  src={option.logo}
                  sx={{ width: 25, height: 25 }}
                />
              </ListItemAvatar>
              <ListItemText primary={option.name} />
            </MenuItem>
          </StyledLink>
        ))}
        <Divider
          component="li"
          sx={{
            borderColor: '#DFE1E5',
            marginLeft: '15px',
            marginRight: '15px',
          }}
        />
        <StyledLink to={`/projects/create`}>
          <MenuItem>
            <ListItemText primary="Create project" />
          </MenuItem>
        </StyledLink>
        <Divider
          component="li"
          sx={{
            borderColor: '#DFE1E5',
            marginLeft: '15px',
            marginRight: '15px',
          }}
        />
      </MenuWrapper>
    </>
  );
}
