import { FC, useState } from 'react';
import ProjectForm from 'features/project/ProjectForm';
import { useNavigate } from 'react-router-dom';
import { createProject } from 'api/api';
import { useSnackbar } from 'notistack';

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

const ProjectCreate: FC = () => {
  const [initialValues, setInitialValues] = useState({
    name: '',
    description: '',
    logo: 'https://i2.wp.com/thehealthyexec.com/wp-content/uploads/2015/11/reddit-logo.png',
    admins: [],
    users: [],
    newUsers: [],
  });
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleResponse = (response) => {
    if (response.status == 'success') {
      displayStatus(
        enqueueSnackbar,
        'success',
        'Successfully created the project',
        () => {
          navigate('/projects/list');
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
    setLoading(true);

    const payload = dirtyFields.reduce((obj, key) => {
      let value = data[key];
      if (key == 'newUsers') {
        value = data.newUsers.map((user) => user._id);
        return { ...obj, users: value };
      } else {
        return { ...obj, [key]: value };
      }
    }, {});

    const response = await createProject(payload);
    handleResponse(response);
    setLoading(false);
  };
  const navigate = useNavigate();

  return (
    <>
      <ProjectForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        loading={loading}
      />
    </>
  );
};

export default ProjectCreate;
