import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Autocomplete,
  Avatar,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import TextFieldWrapper from 'shared/components/TextFieldWrapper';
import ChipWrapper from 'shared/components/ChipWrapper/ChipWrapper';
import { useDebounce } from 'use-debounce';
import { useSearchUsersQuery } from 'features/auth/userAPISlice';

type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
};

const SearchMembers = ({
  onChange,
  name,
  reset,
  excludeList = [],
  ...otherProps
}) => {
  // selectedUsers: Users selected by the clent
  const [selectedUsers, setSelectedUsers] = React.useState<UserType[]>([]);
  // inputValue: value typed in the input textfield
  const [inputValue, setInputValue] = React.useState<string>('');
  // filteredOptions: value in option that are not selected
  const [filteredOptions, setFilteredOptions] = React.useState<UserType[]>([]);
  // serchPath: base url to search for user details

  useEffect(() => {
    onChange(selectedUsers);
  }, [selectedUsers]);

  const [searchTerm] = useDebounce(inputValue, 500);

  const { data: userList, isFetching } = useSearchUsersQuery({
    searchString: searchTerm || '',
  });

  // Remove users that are selected, from the options
  useEffect(() => {
    const allExcludedUsers = selectedUsers.concat(excludeList);
    const filteredUsers = (userList || []).filter(
      (user) => !allExcludedUsers.map((item) => item._id).includes(user._id),
    );

    setFilteredOptions(filteredUsers);
  }, [userList, excludeList]);

  // Remove user from the list when they are de-selected.
  const removeUserFromSelection = (userid: string) => {
    return () =>
      setSelectedUsers(selectedUsers.filter((user) => user._id != userid));
  };

  const updateQuery = (event, newInputValue, reason) => {
    if (['input', 'clear'].includes(reason)) {
      setInputValue(newInputValue);
    }
  };

  useEffect(() => {
    setSelectedUsers([]);
    setInputValue('');
  }, [reset]);

  return (
    <div>
      <Autocomplete
        onChange={(event: any, newValue) => {
          if (newValue) {
            setSelectedUsers([...selectedUsers, newValue]);
          }
        }}
        loading={isFetching}
        loadingText="Loading…"
        getOptionLabel={(user) => `${user.email}`}
        isOptionEqualToValue={(option, value) => {
          return option.email == value.email;
        }}
        inputValue={inputValue}
        onInputChange={updateQuery}
        noOptionsText={'No available users'}
        options={filteredOptions}
        sx={{ width: 300 }}
        renderOption={(props, user) => (
          <MenuItem value={user._id} key={user._id} {...props}>
            <ListItemIcon>
              <Avatar
                alt={'upload-image'}
                src={user.imageUrl}
                sx={{ width: 30, height: 30 }}
              />
            </ListItemIcon>
            <ListItemText>{user.email}</ListItemText>
          </MenuItem>
        )}
        renderInput={(params) => (
          <TextFieldWrapper
            {...params}
            label="Add Members"
            placeholder="Seach by email id"
            {...otherProps}
          />
        )}
      />
      <div>
        <Grid container spacing={1} sx={{ marginTop: '8px' }}>
          {selectedUsers.map((user) => (
            <Grid item key={user._id}>
              <ChipWrapper
                avatar={<Avatar alt="Natacha" src={user.imageUrl} />}
                label={user.firstName}
                variant="outlined"
                onDelete={removeUserFromSelection(user._id)}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default SearchMembers;
