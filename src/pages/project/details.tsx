import EditProject from 'components/project/EditProject';
import { useParams } from 'react-router-dom';
import { FC } from 'react';
const PageEditProject: FC = (props) => {
  const { projectId } = useParams();
  return <EditProject projectId={projectId} />;
};

export default PageEditProject;
