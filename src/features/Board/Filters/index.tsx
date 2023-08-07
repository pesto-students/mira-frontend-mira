import React, { useCallback, useEffect, useState } from 'react';
import {
  InputAdornment,
  ToggleButton,
  Avatar,
  AvatarGroup,
  Menu,
  MenuItem,
  ListItemAvatar,
  ListItemText,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { debounce, xor } from 'lodash';

import { ClearAll, Filters } from './Styles';

import TextFieldWrapper from 'ui/TextFieldWrapper';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
  setClearAll,
  setMyOnly,
  setRecent,
  setSearchTerm,
  setUserIds,
} from './FilterSlice';

import { useGetProjectQuery } from 'features/project/projectApiSlice';

const AvatarMenu = ({ anchorEl, handleClose, open, data, onAvatarClick }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {data.map((user) => (
        <Box
          key={user.key}
          onClick={() => {
            onAvatarClick(user);
          }}
        >
          <MenuItem
            key={user.key}
            onClick={handleClose}
            selected={false}
            value={user}
          >
            <ListItemAvatar sx={{ minWidth: '40px' }}>
              <Avatar
                alt={'project-logo'}
                src={user.src}
                sx={{ width: 25, height: 25 }}
              />
            </ListItemAvatar>
            <ListItemText primary={user.name} />
          </MenuItem>
        </Box>
      ))}
    </Menu>
  );
};

const GroupAvatars = ({ data = [], onAvatarClick, maxCount }) => {
  const { filterBar } = useAppSelector((state) => state);
  const { userIds: selectedUsers } = filterBar;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [excessData, setExcessData] = useState([]);

  useEffect(() => {
    setExcessData(data.slice(maxCount - 1));
  }, [data, maxCount]);
  return (
    <>
      <AvatarGroup
        max={maxCount}
        onClick={(e) => {
          if (e.target.outerText.includes('+')) {
            setAnchorEl(e.target);
          }
        }}
        sx={{ cursor: 'pointer' }}
      >
        {data.map((user) => {
          return (
            <Avatar
              key={user.key}
              alt={user.name}
              src={user.src}
              onClick={() => {
                onAvatarClick(user);
              }}
            />
          );
        })}
      </AvatarGroup>
      <AvatarMenu
        anchorEl={anchorEl}
        handleClose={() => {
          setAnchorEl(null);
        }}
        open={open}
        data={excessData}
        onAvatarClick={onAvatarClick}
      />
    </>
  );
};

const ProjectBoardFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    filterBar,
    project: { currentProject },
  } = useAppSelector((state) => state);
  const { searchTerm, userIds, myOnly, recent } = filterBar;

  const [userInput, setUserInput] = useState(searchTerm);
  const [formattedAvatarData, setFormattedAvatarData] = useState([]);
  const { data: project } = useGetProjectQuery(currentProject._id);

  useEffect(() => {
    if (!searchTerm) {
      setUserInput('');
    }
    if (userIds && !userIds.length) {
      setFormattedAvatarData((prev) => {
        const data = [...prev];
        data.map((d) => (d.selected = false));
        return data;
      });
    }
  }, [searchTerm, userIds]);

  useEffect(() => {
    if (project) {
      const { users, admins } = project;
      const allUsers = [...users, ...admins];
      setFormattedAvatarData(() => {
        return allUsers.map((d) => ({
          email: d.email,
          key: d._id,
          name: d.firstName,
          src: d.imageUrl,
          selected: false,
        }));
      });
    }
  }, [project]);

  const handleSearchChange = useCallback(
    debounce((value) => {
      dispatch(setSearchTerm(value));
    }, 500),
    [],
  );

  const handleUserSelect = (avatar) => {
    dispatch(setUserIds(xor(userIds, [avatar.key])));
    setFormattedAvatarData((prev) => {
      const data = [...prev];
      data.map((d) => {
        if (d.key === avatar.key) {
          d.selected = !d.selected;
        }
      });
      return data;
    });
  };

  const areFiltersCleared =
    !searchTerm && userIds.length === 0 && !myOnly && !recent;

  useEffect(() => {
    dispatch(setClearAll());
  }, [currentProject._id]);

  return (
    <Filters>
      <TextFieldWrapper
        style={{
          marginRight: '18px',
          width: '160px',
          flexShrink: 0,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value={userInput}
        onChange={(e) => {
          setUserInput(e.target.value);
          handleSearchChange(e.target.value);
        }}
      />
      <GroupAvatars
        data={formattedAvatarData}
        onAvatarClick={handleUserSelect}
        maxCount={3}
      />
      <ToggleButton
        value="check"
        selected={myOnly}
        onChange={() => {
          dispatch(setMyOnly(!myOnly));
        }}
        sx={{
          '&': {
            border: 'none',
            ml: 1,
            p: 1,
            flexShrink: 0,
          },
        }}
      >
        Only My Issues
      </ToggleButton>
      <ToggleButton
        value="check"
        sx={{
          '&': {
            border: 'none',
            ml: 1,
            p: 1,
            flexShrink: 0,
          },
        }}
        selected={recent}
        onChange={() => {
          dispatch(setRecent(!recent));
        }}
      >
        Close to Deadline
      </ToggleButton>

      {!areFiltersCleared && (
        <ClearAll onClick={() => dispatch(setClearAll())}>Clear all</ClearAll>
      )}
    </Filters>
  );
};

export default ProjectBoardFilters;
