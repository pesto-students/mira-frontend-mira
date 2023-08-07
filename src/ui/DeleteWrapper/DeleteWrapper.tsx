import ButtonWrapper from '../ButtonWrapper';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  Button,
  Box,
  IconButton,
  Typography,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

const ConfirmDialog = ({ open, onClose, action, confirmationText }) => {
  const handleCancel = () => {
    onClose();
  };
  const handleConfirm = () => {
    onClose();
    action();
  };
  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogContent
        sx={(theme) => ({
          paddingBottom: theme.spacing(4),
        })}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'right',
            width: '100%',
          }}
        >
          <IconButton onClick={handleCancel}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="h4" sx={{ textAlign: 'center' }}>
          Are you sure?
        </Typography>
        <Typography
          sx={(theme) => ({ textAlign: 'center', marginTop: theme.spacing(4) })}
        >
          {confirmationText}
        </Typography>
        <Box
          sx={(theme) => ({
            marginTop: theme.spacing(4),
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            width: '100%',
            gap: theme.spacing(4),
          })}
        >
          <ButtonWrapper
            variant="contained"
            onClick={handleConfirm}
            sx={(theme) => ({
              backgroundColor: theme.colors.secondary,
              marginTop: theme.spacing(4),
              paddingTop: '8px',
              paddingBottom: '8px',
              paddingLeft: '16px',
              paddingRight: '16px',
              color: theme.colors.textDark,
              '&:hover': {
                backgroundColor: theme.colors.primary,
                color: theme.colors.textWhite,
              },
            })}
          >
            Cancel
          </ButtonWrapper>
          <ButtonWrapper
            variant="contained"
            onClick={handleConfirm}
            startIcon={<DeleteIcon />}
            sx={(theme) => ({
              backgroundColor: theme.colors.danger,
              marginTop: theme.spacing(4),
              paddingTop: '8px',
              paddingBottom: '8px',
              paddingLeft: '16px',
              paddingRight: '16px',
              '&:hover': {
                backgroundColor: theme.colors.dangerLight,
              },
            })}
          >
            Delete
          </ButtonWrapper>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default function DeleteWrapper({
  text,
  onConfirm,
  confirmationText = '',
  ...otherProps
}) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      {text ? (
        <ButtonWrapper
          variant="contained"
          onClick={() => {
            setOpenModal(!openModal);
          }}
          startIcon={<DeleteIcon />}
          {...otherProps}
          sx={(theme) => ({
            backgroundColor: theme.colors.danger,
            marginTop: '10px',
            '&:hover': {
              backgroundColor: theme.colors.dangerLight,
            },
          })}
        >
          {text}
        </ButtonWrapper>
      ) : (
        <IconButton
          aria-label="delete"
          onClick={() => {
            setOpenModal(!openModal);
          }}
        >
          <DeleteIcon />
        </IconButton>
      )}
      <ConfirmDialog
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        confirmationText={confirmationText}
        action={onConfirm}
      />
    </>
  );
}
