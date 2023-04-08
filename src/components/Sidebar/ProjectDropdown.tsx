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

const options = [
  {
    _id: '642569949ef06adb176ed64e',
    name: 'Lorem ipsum asd',
    description: 'Lorem ipsum setum',
    logo: 'https://firebasestorage.googleapis.com/v0/b/mira-v1-2b0a0.appspot.com/o/projectLogo%2Fcmb.postman_collection.jpeg611159?alt=media&token=711afe30-a259-47d6-b88d-a00c48f0bb17',
    users: ['642022a8f3303b9e67d8c0e0', '6412fc24e60a09b052e31773'],
    admins: ['641138545ab8c5b59a359637', '641ff012832a45db9e3a6cc7'],
    id: '642569949ef06adb176ed64e',
  },
  {
    _id: '642ac3007248de43a28ebe29',
    name: 'My new project',
    description: 'My new project description',
    users: [],
    admins: ['641138545ab8c5b59a359637'],
    id: '642ac3007248de43a28ebe29',
  },
  {
    _id: '642ac36e4a94be02fc1b0676',
    name: 'My new title',
    description: 'My new project desc',
    logo: 'https://firebasestorage.googleapis.com/v0/b/mira-v1-2b0a0.appspot.com/o/projectLogo%2FAfter.jpeg93388028?alt=media&token=669dfb2c-3894-4006-9b63-27577c5581b9',
    users: ['64256b99f8693445622c4bc4', '64201f5e64763743c48c8111'],
    admins: ['641138545ab8c5b59a359637'],
    id: '642ac36e4a94be02fc1b0676',
  },
];

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
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: MouseEvent<HTMLElement>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
                src={options[selectedIndex].logo}
                sx={{ width: 40, height: 40 }}
              />
            </ListItemAvatar>
            <ListItemText primary={options[selectedIndex].name} />
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
        {options.map((option, index) => (
          <StyledLink
            key={option._id}
            to={`/projects/${option._id}/overview`}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            <MenuItem
              selected={index === selectedIndex}
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
