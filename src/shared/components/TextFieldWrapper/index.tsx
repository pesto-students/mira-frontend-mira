import React from 'react';
import { InputLabel, TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';
import { sxTextField } from './Styles';

const TextFieldWrapper: React.FC<TextFieldProps> = (props) => {
  const { label, name, sx, ...textFieldProps } = props;

  return (
    <>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <TextField
        autoComplete="on"
        name={name}
        fullWidth
        id={name}
        {...textFieldProps}
        sx={[
          {
            ...sxTextField,
          },
          // You cannot spread `sx` directly because `SxProps` (typeof sx) can be an array.
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      />
    </>
  );
};

export default TextFieldWrapper;
