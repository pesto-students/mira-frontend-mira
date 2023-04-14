import React from 'react';
import {
  Select as MuiSelect,
  InputLabel,
  styled,
  Typography,
} from '@mui/material';

const HelperText = styled(Typography)(({ theme }) => ({
  '&': {
    fontSize: '0.75rem',
    marginTop: '4px',
  },
  '&.helperText-error': {
    color: '#FF1943',
  },
}));

const Select = (props, ref) => {
  const { children, label, name, error, helperText, ...otherProps } = props;
  return (
    <>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <MuiSelect name={name} inputRef={ref} {...otherProps}>
        {children}
      </MuiSelect>
      <HelperText className={error ? 'helperText-error' : ''}>
        {helperText}
      </HelperText>
    </>
  );
};

const SelectBase = React.forwardRef(Select);

export const SelectWrapper = styled(SelectBase)(({ theme }) => ({
  '&.MuiInputBase-root': {
    minHeight: '33px',
  },
  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '16px',
    paddingRight: '7px',
    paddingTop: '2px',
    paddingBottom: '2px',
  },
  '& .MuiListItemIcon-root': {
    minWidth: theme.spacing(4),
  },
  '& .MuiTypography-root': {
    fontSize: '14px',
    overflow: 'hidden',
  },
  '& MuiSvgIcon-root': {
    fontSize: '19px',
  },
}));

export const SelectWrapperTable = styled(SelectBase)(({ theme }) => ({
  boxShadow: 'none',
  '.MuiOutlinedInput-notchedOutline': { border: 0 },
  '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    border: 0,
  },
  '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: 0,
  },
}));
