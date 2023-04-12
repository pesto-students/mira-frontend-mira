import { FC, useState, useEffect } from 'react';
import ProjectForm from 'features/project/ProjectForm';
import { useSnackbar } from 'notistack';
import {
  useGetProjectQuery,
  useUpdateProjectMutation,
} from 'features/project/projectApiSlice';
import { useAppSelector } from 'App/hooks';
import { useNavigate } from 'react-router-dom';
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
  name: '',
  description: '',
  logo: '',
  users: [],
  newUsers: [],
});

const ProjectEdit: FC = () => {
  const [initialValues, setInitialValues] = useState(JSON.parse(init));

  const { currentProject } = useAppSelector((state) => state.project);
  const navigate = useNavigate();

  const {
    data: project,
    isFetching: isFetchingProject,
    isSuccess: isSuccessFetch,
    isError: isErrorFetch,
    error: errorFetch,
    refetch,
  } = useGetProjectQuery(currentProject._id);

  const [
    updateProject,
    {
      data: response,
      isLoading: isProcessing,
      isSuccess: isSuccessUpdate,
      error: errorUpdate,
      isError: isErrorUpdate,
      reset,
    },
  ] = useUpdateProjectMutation();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isErrorFetch) {
      displayStatus(enqueueSnackbar, 'error', errorFetch);
    }
  }, [isFetchingProject]);

  useEffect(() => {
    if (isSuccessUpdate) {
      displayStatus(
        enqueueSnackbar,
        'success',
        'Successfully edited the project',
      );
    }
    if (isErrorUpdate) {
      displayStatus(enqueueSnackbar, 'error', errorUpdate);
    }
  }, [isProcessing]);

  useEffect(() => {
    if (!isFetchingProject && isSuccessFetch) {
      setInitialValues((prev) => {
        const data = { ...JSON.parse(init), ...project };
        data.usersWithRole = data.allUsers;
        return data;
      });
    }
  }, [currentProject._id, isFetchingProject]);

  const onSubmit = async (data, dirtyFields) => {
    const newUsers = data.newUsers.map((user) => user._id);
    const users = data.usersWithRole
      .filter((item) => item.role == 'user')
      .map((user) => user._id);
    const admins = data.usersWithRole
      .filter((item) => item.role == 'admin')
      .map((user) => user._id);

    const allUsers = users.concat(newUsers);

    const payload = {
      name: data.name,
      description: data.description,
      logo: data.logo,
      users: allUsers,
      admins,
    };
    await updateProject({ id: currentProject._id, payload });
  };

  return (
    <>
      <GlobalLoader open={isFetchingProject} />
      <ProjectForm
        initialValues={initialValues}
        isCreateProject={false}
        loading={isFetchingProject}
        processing={isProcessing}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default ProjectEdit;
