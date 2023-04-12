import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import CardFormOverview from 'features/card/CardFormOverview';
import { format } from 'date-fns';
import { useAppSelector } from 'App/hooks';
import { useGetProjectQuery } from 'features/project/projectApiSlice';
import {
  useGetCardQuery,
  useUpdateCardMutation,
} from 'features/card/cardApiSlice';
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
  title: '',
  description: '',
  status: '',
  priority: '',
  estimatedDate: null,
  reporter: '',
  assignee: '',
});

const CardEdit: FC = () => {
  const [initialValues, setInitialValues] = useState(JSON.parse(init));
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { cardId } = useParams();
  const { currentProject } = useAppSelector((state) => state.project);

  const onSubmit = async (data, dirtyFields) => {
    const payload = dirtyFields.reduce((obj, key) => {
      let value = data[key];
      if (key == 'estimatedDate') {
        value = format(value, 'yyyy-MM-dd');
      }
      return { ...obj, [key]: value };
    }, {});

    await updateCard({ projectId: currentProject._id, id: cardId, payload });
  };

  const {
    data: project,
    isFetching: isFetchingProject,
    isError: isErrorProject,
    error: errorFetchProject,
  } = useGetProjectQuery(currentProject._id);

  const {
    data: card,
    isFetching: isFetchingCard,
    isError: isErrorCard,
    error: errorCard,
    isSuccess: isSuccessFetchingCard,
  } = useGetCardQuery({ projectId: currentProject._id, id: cardId });

  const [
    updateCard,
    {
      data: response,
      isLoading: isProcessing,
      isSuccess: isSuccessUpdate,
      error: errorUpdate,
      isError: isErrorUpdate,
      reset,
    },
  ] = useUpdateCardMutation();

  useEffect(() => {
    setLoading(isFetchingCard || isFetchingProject);
  }, [isFetchingCard, isFetchingProject]);

  useEffect(() => {
    if (!isFetchingCard && isSuccessFetchingCard) {
      setInitialValues((prev) => {
        const data = { ...prev, ...card };
        if (data.estimatedDate && !(data.estimatedDate instanceof Date)) {
          data.estimatedDate = new Date(data.estimatedDate);
        }
        'reporter' in data && (data.reporter = data.reporter._id);
        'description' in data &&
          (data.description = data.description.replace(/&lt;/g, '<'));
        return data;
      });
    }
  }, [isFetchingCard]);

  useEffect(() => {
    if (isErrorProject) {
      displayStatus(enqueueSnackbar, 'error', errorFetchProject);
    }
  }, [isFetchingProject]);

  useEffect(() => {
    if (isErrorCard) {
      displayStatus(enqueueSnackbar, 'error', errorCard);
    }
  }, [isFetchingProject]);

  useEffect(() => {
    if (isSuccessUpdate) {
      displayStatus(
        enqueueSnackbar,
        'success',
        'Successfully edited the Card',
        () => {
          navigate(`/projects/${currentProject._id}/dashboard`);
        },
      );
    }
    if (isErrorUpdate) {
      displayStatus(enqueueSnackbar, 'error', errorUpdate);
    }
  }, [isProcessing]);

  return (
    <>
      <GlobalLoader open={isFetchingProject || isFetchingCard} />
      <CardFormOverview
        initialValues={initialValues}
        onSubmit={onSubmit}
        loading={loading}
        processing={isProcessing}
        isCreate={false}
        project={project || {}}
      />
    </>
  );
};

export default CardEdit;
