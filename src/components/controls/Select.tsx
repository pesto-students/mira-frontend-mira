import React from 'react';
import {
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import type {
  SxProps,
  Theme,
  SelectProps as MuiSelectProps,
} from '@mui/material';

const styles: SxProps<Theme> = {
  mt: 0,
  mb: 0,
  '&.MuiInputBase-root': { backgroundColor: 'secondary.main' },
  '&.MuiInputBase-root:hover': {
    backgroundColor: 'secondary.light',
  },
  '& input:focus': {
    backgroundColor: '#ffffff',
  },
  '& .MuiInputBase-input': {
    padding: '10px 26px 10px 12px',
  },
};

type SelectOptionsType = {
  title: string;
  value: string;
};

export interface SelectProps extends MuiSelectProps {
  options: SelectOptionsType[];
}

const Select: React.FC<SelectProps> = (props) => {
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    options,
    ...otherProps
  } = props;

  return (
    <>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <MuiSelect
        name={name}
        value={value}
        onChange={onChange}
        sx={styles}
        {...otherProps}
      >
        <MenuItem value="">None</MenuItem>
        {options.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </>
  );
};
export default Select;
