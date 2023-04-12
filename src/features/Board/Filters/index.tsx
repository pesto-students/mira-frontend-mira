import React, { useCallback, useEffect, useState } from 'react';
import { InputAdornment, ToggleButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { debounce, xor } from 'lodash';

import { ClearAll, Filters } from './Styles';

import TextFieldWrapper from 'shared/components/TextFieldWrapper';
// import AvatarGroupWrapper, {
//   type AvatarPropsExtended,
// } from 'shared/components/AvatarGroupWrapper';
import { useAppDispatch, useAppSelector } from 'App/hooks';
import {
  setClearAll,
  setMyOnly,
  setRecent,
  setSearchTerm,
  setUserIds,
} from './FilterSlice';

import { useGetProjectQuery } from 'features/project/projectApiSlice';

const ProjectBoardFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    filterBar,
    project: { currentProject },
  } = useAppSelector((state) => state);
  const { searchTerm, userIds, myOnly, recent } = filterBar;

  const [userInput, setUserInput] = useState(searchTerm);
  const [formattedAvatarData, setFormattedAvatarData] = useState<
    AvatarPropsExtended[]
  >([]);
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

  const handleUserSelect = (avatar: AvatarPropsExtended) => {
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

  return (
    <Filters>
      <TextFieldWrapper
        style={{
          marginRight: '18px',
          width: '160px',
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
      {/* <AvatarGroupWrapper
        data={formattedAvatarData}
        onAvatarClick={handleUserSelect}
        maxCount={3}
      /> */}
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
