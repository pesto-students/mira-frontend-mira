import React from 'react';
import { InputLabel, TextField } from '@mui/material';
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

const TextFieldWrapper: React.FC<TextFieldProps> = (props, ref) => {
  const { label, name, ...textFieldProps } = props;

  return (
    <>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <TextField
        autoComplete="on"
        name={name}
        fullWidth
        id={name}
        sx={styles}
        inputRef={ref}
        {...textFieldProps}
      />
    </>
  );
};

export default React.forwardRef(TextFieldWrapper);
