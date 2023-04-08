import React from 'react';
import { Button } from '@mui/material';
import type { ButtonProps } from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

interface IProps extends ButtonProps {
  children: React.ReactNode;
  loading?: boolean;
}

const style = {
  margin: '15px 0px',
  padding: '10px',
};

const ButtonWrapper: React.FC<IProps> = (props) => {
  const { children, loading, ...buttonProps } = props;
  return loading ? (
    <LoadingButton
      disableElevation
      loading
      variant="outlined"
      {...buttonProps}
      sx={style}
    >
      Loading...
    </LoadingButton>
  ) : (
    <Button sx={style} disableElevation {...buttonProps}>
      {children}
    </Button>
  );
};

export default ButtonWrapper;
