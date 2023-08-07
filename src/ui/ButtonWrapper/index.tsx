import React from 'react';
import { Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

type Props = any; // ExtendButtonBase<ButtonTypeMap>;

const style = {
  margin: '15px 0px',
  padding: '10px',
};

const ButtonWrapper: React.FC<Props> = (props) => {
  const { children, loading, ...buttonProps } = props;
  return loading ? (
    <LoadingButton
      disableElevation
      sx={style}
      loading
      variant="outlined"
      {...buttonProps}
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
