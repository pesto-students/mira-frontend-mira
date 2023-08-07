import { useEffect } from 'react';
import { format } from 'date-fns';
import RegisterForm from './RegisterForm';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useCreateProfileMutation } from './userApiSlice';

const displayStatus = (
  enqueueSnackbar,
  status,
  message,
  onClose = () => {},
) => {
  enqueueSnackbar(message, {
    variant: status,
    autoHideDuration: 1500,
    onClose,
  });
};

export default function Register() {
  const initialValues = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dob: format(new Date(), 'yyyy-MM-dd'),
    confirmPassword: '',
    imageUrl:
      'https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=200',
  };

  const { enqueueSnackbar } = useSnackbar();

  const [
    createProfile,
    { data, isLoading: isProcessing, isSuccess, error, isError },
  ] = useCreateProfileMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isProcessing && isSuccess) {
      displayStatus(
        enqueueSnackbar,
        'success',
        'You are successfully registered, please login',
        () => {
          navigate(`/login`);
        },
      );
    }
    if (isError) {
      displayStatus(enqueueSnackbar, 'error', error);
    }
  }, [isProcessing]);

  const onSubmit = (data, dirtyFields) => {
    createProfile({ data });
  };

  return (
    <>
      <RegisterForm
        initialValues={initialValues}
        isCreate={true}
        processing={isProcessing}
        onSubmit={onSubmit}
      />
    </>
  );
}
