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
import { searchUsers } from 'api/api';

type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
};

const SearchMembersSingle = (props) => {
  const { onChange, name, label, ...otherProps } = props;
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

  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      (async () => {
        setLoading(true);
        const response = await searchUsers(inputValue);
        if (response && response.status == 'success') {
          setUserList(response.data.data);
        } else {
          setUserList([]);
        }
        setLoading(false);
      })();
    }, 500);
    return () => clearTimeout(timer);
  }, [inputValue]);

  // Remove users that are selected, from the options
  useEffect(() => {
    setFilteredOptions(
      userList.filter(
        (user) => !selectedUsers.map((item) => item._id).includes(user._id),
      ),
    );
  }, [userList]);

  // Remove user from the list when they are de-selected.
  const removeUserFromSelection = (userid: string) => {
    return () =>
      setSelectedUsers(selectedUsers.filter((user) => user._id != userid));
  };

  const updateQuery = (event, newInputValue, reason) => {
    setInputValue(newInputValue);
  };

  return (
    <div>
      <Autocomplete
        onChange={(event: any, newValue) => {
          if (newValue) {
            setSelectedUsers([...selectedUsers, newValue]);
          }
        }}
        loading={loading}
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
            label={label}
            placeholder="Seach by email id"
            {...otherProps}
          />
        )}
      />
    </div>
  );
};

export default SearchMembersSingle;
