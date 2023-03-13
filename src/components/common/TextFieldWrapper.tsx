import React from 'react';
import { InputLabel, TextField } from '@mui/material';
import type { TextFieldProps, SxProps, Theme } from '@mui/material';

const styles: SxProps<Theme> = {
  mt: 0,
  mb: 0,
  backgroundColor: 'secondary.main',
  '&:hover': {
    backgroundColor: 'secondary.light', //'#ebecf0',
  },
  '& input:focus': {
    backgroundColor: '#ffffff',
  },
};

const TextFieldWrapper: React.FC<TextFieldProps> = (props) => {
  const { label, name, ...textFieldProps } = props;

  return (
    <>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <TextField
        autoComplete="given-name"
        name={name}
        required
        fullWidth
        id={name}
        sx={styles}
        {...textFieldProps}
      />
    </>
  );
};

export default TextFieldWrapper;
