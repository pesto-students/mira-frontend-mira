import { FC, useState, useEffect } from 'react';
import ProjectForm from 'features/project/ProjectForm';
import { useParams, useNavigate } from 'react-router-dom';
import { getProject } from 'api/api';
import { useSnackbar } from 'notistack';
import { updateProject } from 'api/api';

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

const ProjectEdit: FC = (props) => {
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    name: '',
    description: '',
    logo: '',
    usersWithRole: [],
    newUsers: [],
  });

  const { projectId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const mapUserRole = (role) => {
    return (item) => {
      return { ...item, role };
    };
  };

  const handleResponse = (response) => {
    if (response.status == 'success') {
      displayStatus(
        enqueueSnackbar,
        'success',
        'Successfully updated the project',
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

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await getProject({ id: projectId });
      if (response.status == 'success') {
        setInitialValues((prev) => {
          const data = { ...prev, ...response.data.data };
          data.usersWithRole = [
            ...data.admins.map(mapUserRole('admin')),
            ...data.users.map(mapUserRole('user')),
          ];
          return data;
        });
      } else {
        console.log(response);
        handleResponse(response);
      }
      setLoading(false);
    })();
  }, [projectId]);

  const onSubmit = async (data, dirtyFields) => {
    setLoading(true);

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

    // const payload = dirtyFields.reduce((obj, key) => {
    //   let value = data[key];
    //   if (key == 'newUsers') {
    //     value = data.newUsers.map((user) => user._id);
    //     return { ...obj, newUsers: value };
    //   } else if (key == 'usersWithRole') {
    //     const users = data.usersWithRole
    //       .filter((item) => item.role == 'user')
    //       .map((user) => user._id);
    //     const admins = data.usersWithRole
    //       .filter((item) => item.role == 'admin')
    //       .map((user) => user._id);
    //     return { ...obj, users, admins };
    //   } else {
    //     return { ...obj, [key]: value };
    //   }
    // }, {});

    // console.log(payload);

    // const existingUsers = initialValues.usersWithRole
    //   .filter((item) => item.role == 'user')
    //   .map((user) => user._id);

    // payload.users = (payload?.users || existingUsers).concat(
    //   payload?.newUsers || [],
    // );
    // delete payload.newUsers;

    // console.log(dirtyFields, payload);

    const response = await updateProject(projectId, payload);
    handleResponse(response);
    setLoading(false);
  };

  return (
    <ProjectForm
      initialValues={initialValues}
      isCreateProject={false}
      loading={loading}
      onSubmit={onSubmit}
    />
  );
};

export default ProjectEdit;
