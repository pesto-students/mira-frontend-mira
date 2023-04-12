import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import CardForm from 'features/card/CardForm';
import { format } from 'date-fns';
import { useAppSelector } from 'App/hooks';
import { useGetProjectQuery } from 'features/project/projectApiSlice';
import { useCreateCardMutation } from 'features/card/cardApiSlice';
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

const CardCreate: FC = () => {
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    status: '',
    priority: '',
    estimatedDate: null,
    reporter: '',
    assignee: '',
  });

  const { enqueueSnackbar } = useSnackbar();
  const { currentProject } = useAppSelector((state) => state.project);

  const {
    data: project,
    isFetching: isFetchingProject,
    isError: isErrorFetchProject,
    error: errorFetchProject,
  } = useGetProjectQuery(currentProject._id);

  const [
    createCard,
    {
      data: response,
      error: errorCreate,
      isLoading: isProcessing,
      isError: isErrorCreate,
      isSuccess: isSuccessCreate,
    },
  ] = useCreateCardMutation();

  useEffect(() => {
    if (isErrorFetchProject) {
      displayStatus(enqueueSnackbar, 'error', errorFetchProject);
    }
  }, [isFetchingProject]);

  useEffect(() => {
    if (isSuccessCreate) {
      console.log('Success create');
      displayStatus(
        enqueueSnackbar,
        'success',
        'Successfully created the card',
        () => {
          navigate(`/projects/${currentProject._id}/dashboard`);
        },
      );
    }
    if (isErrorCreate) {
      displayStatus(enqueueSnackbar, 'error', errorCreate);
    }
  }, [isProcessing]);

  const onSubmit = async (data, dirtyFields) => {
    const payload = dirtyFields.reduce((obj, key) => {
      let value = data[key];
      if (key == 'estimatedDate') {
        value = format(value, 'yyyy-MM-dd');
      }
      return { ...obj, [key]: value };
    }, {});

    await createCard({
      projectId: currentProject._id,
      payload,
    });
  };
  const navigate = useNavigate();

  return (
    <>
      <GlobalLoader open={isFetchingProject} />
      <CardForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        processing={isProcessing}
        isCreate={true}
        project={project || {}}
      />
    </>
  );
};

export default CardCreate;
