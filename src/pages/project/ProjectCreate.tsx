import { FC, useEffect, useState } from 'react';
import ProjectForm from 'features/project/ProjectForm';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useCreateProjectMutation } from 'features/project/projectApiSlice';
import { useAppSelector } from 'App/hooks';

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
  name: '',
  description: '',
  logo: 'https://i2.wp.com/thehealthyexec.com/wp-content/uploads/2015/11/reddit-logo.png',
  admins: [],
  users: [],
  newUsers: [],
});

const ProjectCreate: FC = () => {
  const [initialValues, setInitialValues] = useState({ ...JSON.parse(init) });
  const { enqueueSnackbar } = useSnackbar();
  const [
    createProject,
    { data: createData, error, isLoading: isProcessing, isError, isSuccess },
  ] = useCreateProjectMutation();
  const { currentProject } = useAppSelector((state) => state.project);

  useEffect(() => {
    if (isSuccess) {
      displayStatus(
        enqueueSnackbar,
        'success',
        'Successfully created the project',
        () => {
          navigate(`/projects/${createData._id}/dashboard`);
        },
      );
    }
    if (isError) {
      displayStatus(enqueueSnackbar, 'error', error);
    }
  }, [isProcessing]);

  const onSubmit = async (data, dirtyFields) => {
    const payload = dirtyFields.reduce((obj, key) => {
      let value = data[key];
      if (key == 'newUsers') {
        value = data.newUsers.map((user) => user._id);
        return { ...obj, users: value };
      } else {
        return { ...obj, [key]: value };
      }
    }, {});

    createProject(payload);
  };
  const navigate = useNavigate();

  return (
    <>
      <ProjectForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        processing={isProcessing}
      />
    </>
  );
};

export default ProjectCreate;
