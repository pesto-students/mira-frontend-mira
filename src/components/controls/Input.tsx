import React from 'react';
import { InputLabel, TextField, FormControl } from '@mui/material';
import type { TextFieldProps, SxProps, Theme } from '@mui/material';

const styles: SxProps<Theme> = {
  mt: 0,
  mb: 0,
  '& .MuiInputBase-root': { backgroundColor: 'secondary.main' },
  '& .MuiInputBase-root:hover': {
    backgroundColor: 'secondary.light',
  },
  '& input:focus': {
    backgroundColor: '#ffffff',
  },
};

const Input: React.FC<TextFieldProps> = (props, ref) => {
  const { name, label, value, onChange, ...otherProps } = props;
  return (
    <>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <TextField
        fullWidth
        name={name}
        value={value}
        onChange={onChange}
        inputRef={ref}
        sx={styles}
        {...otherProps}
      />
    </>
  );
};

export default React.forwardRef(Input);
