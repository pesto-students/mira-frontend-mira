import React from 'react';
import {
  InputLabel,
  TextField as MuiTextField,
  styled,
  Typography,
} from '@mui/material';
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

const HelperText = styled(Typography)(({ theme }) => ({
  '&': {
    fontSize: '0.75rem',
    marginTop: '4px',
  },
  '&.helperText-error': {
    color: '#FF1943',
  },
}));

const TextField: React.FC<TextFieldProps> = (props, ref) => {
  const { label, required, name, error, helperText, ...textFieldProps } = props;

  return (
    <>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <MuiTextField
        autoComplete="on"
        name={name}
        fullWidth
        id={name}
        sx={styles}
        inputRef={ref}
        {...textFieldProps}
      />
      <HelperText className={error ? 'helperText-error' : ''}>
        {helperText}
      </HelperText>
    </>
  );
};

const TextFieldWrapper = React.forwardRef(TextField);

export default TextFieldWrapper;

export const TextFieldHeading = styled(TextFieldWrapper)(({ theme }) => ({
  '& textarea': {
    fontSize: '24px',
    lineHeight: '125%',
    fontFamily: 'IBM Plex Sans',
    fontWeight: 'bold',
  },
  '& .MuiInputBase-root': { backgroundColor: 'white', padding: 0 },
  '& .MuiInputBase-root:hover': {
    backgroundColor: 'white',
  },
  '& input:focus': {
    backgroundColor: 'white',
  },
  '& fieldset': { border: 'none' },
}));
