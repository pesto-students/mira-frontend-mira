import React from 'react';
import { Button as MuiButton } from '@mui/material';
import type {
  ButtonProps as MuiButtonProps,
  SxProps,
  Theme,
} from '@mui/material';

export interface ButtonProps extends MuiButtonProps {
  text?: string;
}

const styles: SxProps<Theme> = (theme) => {
  return {
    '&.MuiButton-root': { textTransform: 'unset', margin: theme.spacing(0.5) },
  };
};

const Button: React.FC<ButtonProps> = (props) => {
  const { text, size, color, variant, onClick, ...other } = props;

  return (
    <MuiButton
      variant={variant || 'contained'}
      size={size || 'large'}
      color={color || 'primary'}
      onClick={onClick}
      {...other}
      sx={styles}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
