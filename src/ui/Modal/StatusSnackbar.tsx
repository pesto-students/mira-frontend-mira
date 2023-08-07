import React from 'react';
import { useSnackbar } from 'notistack';

function StatusSnackbar({ status, message, onClose = () => {} }) {
  const { enqueueSnackbar } = useSnackbar();

  enqueueSnackbar(message, {
    variant: status,
    autoHideDuration: 3000,
    onClose,
  });

  return <div />;
}

export default StatusSnackbar;
