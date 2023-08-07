import { FC, useState, useEffect } from 'react';
import ProjectForm from 'features/project/ProjectForm';
import { useSnackbar } from 'notistack';
import {
  useGetProjectQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from 'features/project/projectApiSlice';
import { useAppSelector } from 'hooks';
import { NavLink, useNavigate } from 'react-router-dom';
import GlobalLoader from 'ui/GlobalLoader/GlobalLoader';
import Breadcrumbs from 'ui/Breadcrumbs';
import PageHeader from 'ui/PageHeader/PageHeader';

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

  const [
    deleteProject,
    {
      data: responseDelete,
      isLoading: isDeleting,
      isSuccess: isSuccessDelete,
      error: errorDelete,
      isError: isErrorDelete,
    },
  ] = useDeleteProjectMutation();

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
    if (isSuccessDelete) {
      displayStatus(
        enqueueSnackbar,
        'success',
        'Successfully deleted the project',
      );
      navigate(`/projects`);
    }
    if (isErrorDelete) {
      displayStatus(enqueueSnackbar, 'error', errorDelete);
    }
  }, [isDeleting]);

  useEffect(() => {
    if (!isFetchingProject && isSuccessFetch) {
      setInitialValues((prev) => {
        const data = { ...prev, ...project };
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

  const { userInfo } = useAppSelector((state) => state.auth);

  return (
    <>
      <GlobalLoader open={isFetchingProject || isDeleting} />
      <Breadcrumbs items={['Projects', currentProject?.name, 'Overview']} />
      <PageHeader name="Project Overview" />
      <ProjectForm
        initialValues={initialValues}
        isCreateProject={false}
        loading={isFetchingProject}
        processing={isProcessing}
        onSubmit={onSubmit}
        onDelete={() => {
          deleteProject({ id: currentProject._id });
        }}
        isAdmin={currentProject?.admins?.includes(userInfo._id)}
      />
    </>
  );
};

export default ProjectEdit;
