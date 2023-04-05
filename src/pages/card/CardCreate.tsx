import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import CardForm from 'features/card/CardForm';
import { format } from 'date-fns';
import { getProject, createCard } from 'api/api';
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
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [project, setProject] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleResponse = (response) => {
    if (response.status == 'success') {
      displayStatus(
        enqueueSnackbar,
        'success',
        'Successfully created the card',
        () => {
          navigate(`/projects/${projectId}/cards`);
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

    const response = await createCard(projectId, payload);
    handleResponse(response);
    setProcessing(false);
  };
  const navigate = useNavigate();
  const { projectId } = useParams();

  useEffect(() => {
    setLoading(true);
    (async () => {
      const response = await getProject({ id: projectId });
      if (response.status == 'success') {
        setProject(response.data.data);
      } else {
        console.log(response);
        handleResponse(response);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <Typography variant="h5">Create Card</Typography>
      {!loading ? (
        <CardForm
          initialValues={initialValues}
          onSubmit={onSubmit}
          processing={processing}
          isCreate={true}
          project={project}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default CardCreate;
