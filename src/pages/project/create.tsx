import ProjectForm from 'components/project/ProjectForm';
import { FC } from 'react';
const PageProjectCreate: FC = () => {
  const initialValues = {
    name: 'New project',
    description: 'Project description',
    imageUrl: 'https://source.unsplash.com/random',
    admins: [],
    members: [],
    newMembers: [],
  };
  const onSubmit = (data) => console.log(data);
  return <ProjectForm initialValues={initialValues} onSubmit={onSubmit} />;
};

export default PageProjectCreate;
