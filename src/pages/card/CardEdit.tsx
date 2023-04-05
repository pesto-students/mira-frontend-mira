import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import CardFormOverview from 'features/card/CardFormOverview';
import { format } from 'date-fns';
import { getCard, getProject, updateCard } from 'api/api';
import { Typography } from '@mui/material';

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

const CardEdit: FC = () => {
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    status: '',
    priority: '',
    estimatedDate: new Date(),
    reporter: '',
    assignee: '',
  });
  const [loadingCard, setLoadingCard] = useState(false);
  const [loadingProject, setLoadingProject] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [project, setProject] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { projectId, cardId } = useParams();

  const handleResponse = (response) => {
    if (response.status == 'success') {
      displayStatus(
        enqueueSnackbar,
        'success',
        'Successfully updated the card',
        () => {
          // navigate(`projects/list`);
        },
      );
    } else {
      displayStatus(
        enqueueSnackbar,
        'error',
        response?.message || 'Something went wrong',
        () => {
          if (response.status == 401) {
            navigate('/login');
          }
        },
      );
    }
  };

  const onSubmit = async (data, dirtyFields) => {
    setProcessing(true);
    const payload = dirtyFields.reduce((obj, key) => {
      let value = data[key];
      if (key == 'estimatedDate') {
        value = format(value, 'yyyy-MM-dd');
      }
      return { ...obj, [key]: value };
    }, {});

    const response = await updateCard(projectId, cardId, payload);
    handleResponse(response);
    setProcessing(false);
  };

  useEffect(() => {
    (async () => {
      setLoadingCard(true);
      const response = await getCard({ projectId, cardId });
      if (response.status == 'success') {
        setInitialValues((prev) => {
          const data = { ...prev, ...response.data.data };
          if (data.estimatedDate && !(data.estimatedDate instanceof Date)) {
            data.estimatedDate = new Date(data.estimatedDate);
            data.reporter = data.reporter._id;
          }
          'description' in data &&
            (data.description = data.description.replace(/&lt;/g, '<'));
          return data;
        });
      } else {
        handleResponse(response);
      }
      setLoadingCard(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setLoadingProject(true);
      const response = await getProject({ id: projectId });
      if (response.status == 'success') {
        setProject(response.data.data);
      } else {
        console.log(response);
        handleResponse(response);
      }
      setLoadingProject(false);
    })();
  }, []);

  return (
    <>
      <CardFormOverview
        initialValues={initialValues}
        onSubmit={onSubmit}
        processing={processing}
        isCreate={false}
        project={project}
      />
    </>
  );
};

export default CardEdit;
