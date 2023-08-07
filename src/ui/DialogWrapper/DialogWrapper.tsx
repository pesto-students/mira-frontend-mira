import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import ButtonWrapper from '../ButtonWrapper';
import type { DialogProps } from '@mui/material';

interface IDialogWrapperProps extends DialogProps {
  open: boolean;
  handleClose: () => void;
  handleOk: () => void;
  title: string;
  content?: string;
  children?: React.ReactNode;
  okText: string;
  disableOk?: boolean;
}

const DialogWrapper: React.FunctionComponent<IDialogWrapperProps> = (props) => {
  const {
    open,
    handleClose,
    handleOk,
    title,
    content,
    children,
    okText = 'Ok',
    disableOk = false,
    ...rest
  } = props;

  return (
    <Dialog open={open} onClose={handleClose} {...rest}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            margin: '10px 0px',
          }}
        >
          {content}
        </DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        <ButtonWrapper variant="contained" color="error" onClick={handleClose}>
          Cancel
        </ButtonWrapper>
        <ButtonWrapper
          disabled={disableOk}
          variant="contained"
          onClick={handleOk}
        >
          {okText}
        </ButtonWrapper>
      </DialogActions>
    </Dialog>
  );
};

export default DialogWrapper;
