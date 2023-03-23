import React, { useState, useEffect } from 'react';
import { Box, Grid, Autocomplete, Avatar } from '@mui/material';
import TextFieldWrapper from 'components/common/TextFieldWrapper';
import ChipWrapper from 'components/common/ChipWrapper';
import useFetch from 'hooks/useFetch';
import { debounce } from '@mui/material/utils';

type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
};

const SearchMemberGlobal = ({ onChange }) => {
  // options: The list of users
  const [options, setOptions] = React.useState<UserType[]>([]);
  // selectedUsers: Users selected by the clent
  const [selectedUsers, setSelectedUsers] = React.useState<UserType[]>([]);
  // inputValue: value typed in the input textfield
  const [inputValue, setInputValue] = React.useState<string | undefined>(
    undefined,
  );
  // filteredOptions: value in option that are not selected
  const [filteredOptions, setFilteredOptions] = React.useState<UserType[]>([]);
  // serchPath: base url to search for user details
  const [serchPath, setSearchPath] = React.useState<string>(
    'api/v1/users/search',
  );

  useEffect(() => {
    onChange(selectedUsers);
  }, [selectedUsers]);

  // If inputValue is present, use email filter else use base path to search for users.
  useEffect(() => {
    if (inputValue) {
      setSearchPath(`api/v1/users/search?email[like]=${inputValue}`);
    } else {
      setSearchPath('api/v1/users/search');
    }
  }, [inputValue]);

  const {
    data: userData,
    isPending: isPendingLoadingUser,
    error: errorLoadingUser,
  } = useFetch(serchPath, 'GET');

  useEffect(() => {
    if (userData && !isPendingLoadingUser) {
      setOptions(userData);
    }
  }, [isPendingLoadingUser]);

  // Remove users that are selected, from the options
  useEffect(() => {
    setFilteredOptions(
      options.filter(
        (user) => !selectedUsers.map((item) => item._id).includes(user._id),
      ),
    );
  }, [options]);

  // Remove user from the list when they are de-selected.
  const removeUserFromSelection = (userid: string) => {
    return () =>
      setSelectedUsers(selectedUsers.filter((user) => user._id != userid));
  };

  const updateQuery = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const debouncedUpdateQuery = debounce(updateQuery, 400);

  return (
    <div>
      <Autocomplete
        onChange={(event: any, newValue) => {
          if (newValue) {
            setSelectedUsers([...selectedUsers, newValue]);
          }
          setInputValue(undefined);
        }}
        getOptionLabel={(user) => `${user.email}`}
        isOptionEqualToValue={(option, value) => {
          return option.email == value.email;
        }}
        inputValue={inputValue}
        onInputChange={debouncedUpdateQuery}
        noOptionsText={'No available users'}
        options={filteredOptions}
        sx={{ width: 300 }}
        renderOption={(props, user) => (
          <Box component={'li'} {...props} key={user._id}>
            {user.email}
          </Box>
        )}
        renderInput={(params) => (
          <TextFieldWrapper
            {...params}
            label="Add Members"
            placeholder="Seach by email id"
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

export default SearchMemberGlobal;
