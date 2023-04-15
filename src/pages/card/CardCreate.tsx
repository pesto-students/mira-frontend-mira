import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import CardForm from 'features/card/CardForm';
import { format } from 'date-fns';
import { useAppSelector } from 'App/hooks';
import { useGetProjectQuery } from 'features/project/projectApiSlice';
import { useCreateCardMutation } from 'features/card/cardApiSlice';
import GlobalLoader from 'components/GlobalLoader/GlobalLoader';
import Breadcrumbs from 'shared/components/Breadcrumbs';
import PageHeader from 'shared/components/PageHeader/PageHeader';

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
  const { enqueueSnackbar } = useSnackbar();
  const { currentProject } = useAppSelector((state) => state.project);
  const { userInfo: currentUser } = useAppSelector((state) => state.auth);

  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    status: '',
    priority: '',
    estimatedDate: new Date(),
    reporter: currentUser._id,
    assignee: currentUser._id,
  });

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
    data['estimatedDate'] = format(data['estimatedDate'], 'yyyy-MM-dd');
    await createCard({
      projectId: currentProject._id,
      payload: data,
    });
  };
  const navigate = useNavigate();

  return (
    <>
      <GlobalLoader open={isFetchingProject} />
      <Breadcrumbs items={['Projects', currentProject?.name, 'Create Card']} />
      <PageHeader name="Create Card" />
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
