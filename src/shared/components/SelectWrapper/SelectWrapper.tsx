import React from 'react';
import { Select } from '@mui/material';

const SelectWrapper = (props, ref) => {
  const { children, ...otherProps } = props;
  return (
    <>
      <Select
        inputRef={ref}
        sx={{
          boxShadow: 'none',
          '.MuiOutlinedInput-notchedOutline': { border: 0 },
          '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            border: 0,
          },
          '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
            {
              border: 0,
            },
        }}
        {...otherProps}
      >
        {children}
      </Select>
    </>
  );
};

export default React.forwardRef(SelectWrapper);
