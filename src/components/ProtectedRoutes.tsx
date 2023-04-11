import { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'App/hooks';
import { useGetProjectsQuery } from 'features/project/projectApiSlice';
import { setCurrentProject } from 'features/project/projectSlice';

const Loading = () => {
  return (
    <div className="loading">
      <h1>We are loading your dashboard...</h1>
      <span>Thank you for your patience!!</span>
    </div>
  );
};

const Error = ({ refetch, error }) => {
  return (
    <div className="loading">
      <h1>{error || 'We have encountered an error'}</h1>
      <button onClick={refetch}> Please retry </button>
    </div>
  );
};

export default function ProtectedRoutes() {
  const { userInfo } = useAppSelector((state) => state.auth);
  const { currentProject } = useAppSelector((state) => state.project);

  const {
    data: projects,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetProjectsQuery();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { projectId } = useParams();

  useEffect(() => {
    if (isSuccess) {
      if (!projects.results) {
        navigate('/create-project');
      } else {
        let currentProject;
        if (projectId) {
          currentProject = projects.data.data.find(
            (item) => item._id == projectId,
          );
          if (!currentProject) {
            navigate('/not-found');
          }
        } else {
          currentProject = projects.data.data[0];
        }
        dispatch(setCurrentProject(currentProject));
      }
    } else {
      console.log('have projects', projects);
    }
  }, [isSuccess, projects]);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo]);

  return isLoading || !currentProject ? (
    <Loading />
  ) : isError ? (
    <Error refetch={refetch} error={error} />
  ) : (
    <Outlet />
  );
}
