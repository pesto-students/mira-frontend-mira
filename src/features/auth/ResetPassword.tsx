import React, { useState } from 'react';
import DialogWrapper from 'shared/components/DialogWrapper/DialogWrapper';
import TextFieldWrapper from 'shared/components/TextFieldWrapper';
import { sleep } from 'shared/helpers/sleep';
import CircularProgress from '@mui/material/CircularProgress';
import { firebaseSendPasswordResetEmail } from '@/firebase/firebaseConfig';
import { useSnackbar } from 'notistack';

interface IResetPasswordProps {
  onClose: () => void;
}

const ResetPassword: React.FunctionComponent<IResetPasswordProps> = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { onClose } = props;
  const [dialogOpen, setDialogOpen] = useState(true);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
    onClose();
    setLoading(false);
  };

  const handlePasswordReset = async () => {
    setLoading(true);
    await sleep(3000);
    console.log(email);

    firebaseSendPasswordResetEmail(email)
      .then(() => {
        console.log('success');
        enqueueSnackbar('Email sent successfully! - check it out!', {
          variant: 'success',
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        enqueueSnackbar('Error Occured, please try again later!', {
          variant: 'error',
        });
        console.log('An error has occured: ', errorCode, errorMessage);
      })
      .finally(() => {
        handleDialogClose();
      });
  };

  const renderContent = () => {
    if (loading) {
      return <CircularProgress />;
    } else {
      return (
        <TextFieldWrapper
          type="email"
          placeholder="example@example.com"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        ></TextFieldWrapper>
      );
    }
  };

  return (
    <DialogWrapper
      open={dialogOpen}
      title={'Reset Password'}
      content={'Please provide your email to continue'}
      handleClose={handleDialogClose}
      handleOk={handlePasswordReset}
      fullWidth
      okText={'Send reset link'}
      disableOk={loading}
    >
      {renderContent()}
    </DialogWrapper>
  );
};

export default ResetPassword;
