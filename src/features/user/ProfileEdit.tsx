import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import RegisterForm from './RegisterForm';
import { useUpdateProfileMutation, useGetProfileQuery } from './userApiSlice';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import GlobalLoader from 'components/GlobalLoader/GlobalLoader';

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

const init = JSON.stringify({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dob: format(new Date(), 'yyyy-MM-dd'),
  confirmPassword: '',
  imageUrl: '',
});

export default function ProfileEdit() {
  const [initialValues, setInitialValues] = useState(JSON.parse(init));

  const { enqueueSnackbar } = useSnackbar();

  const {
    data: profile,
    isFetching: isFetchingProfile,
    isSuccess: isSuccessFetch,
    isError: isErrorFetch,
    error: errorFetch,
  } = useGetProfileQuery();

  const [
    updateProfile,
    { data, isLoading: isProcessing, isSuccess, error, isError },
  ] = useUpdateProfileMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isErrorFetch) {
      displayStatus(enqueueSnackbar, 'error', errorFetch);
    }
  }, [isFetchingProfile]);

  useEffect(() => {
    if (!isProcessing && isSuccess) {
      displayStatus(
        enqueueSnackbar,
        'success',
        'Successfully updated your profile',
      );
    }
    if (isError) {
      displayStatus(enqueueSnackbar, 'error', error);
    }
  }, [isProcessing]);

  useEffect(() => {
    if (!isFetchingProfile && isSuccessFetch) {
      setInitialValues((prev) => {
        const data = { ...prev, ...profile };
        console.log(data);
        return data;
      });
    }
  }, [isFetchingProfile, isSuccessFetch]);

  const onSubmit = async (data, dirtyFields) => {
    const payload = dirtyFields.reduce((obj, key) => {
      let value = data[key];
      return { ...obj, [key]: value };
    }, {});

    updateProfile({ data: payload });
  };

  return (
    <>
      <GlobalLoader open={isFetchingProfile} />
      <RegisterForm
        initialValues={initialValues}
        isCreate={false}
        processing={isProcessing}
        onSubmit={onSubmit}
      />
    </>
  );
}
