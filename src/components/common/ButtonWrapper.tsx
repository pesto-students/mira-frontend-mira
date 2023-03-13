import React from 'react';
import { Button } from '@mui/material';

type Props = any; // ExtendButtonBase<ButtonTypeMap>;

const ButtonWrapper: React.FC<Props> = (props) => {
  const { children, sx, ...buttonProps } = props;
  return (
    <Button sx={{ ...sx }} {...buttonProps}>
      {children}
    </Button>
  );
};

export default ButtonWrapper;
