import React, { useEffect } from 'react';

import Breadcrumbs from 'ui/Breadcrumbs';

import PageHeader from 'ui/PageHeader/PageHeader';
import Filters from './Filters';
import { useAppSelector } from 'hooks';

import type { IProjectBoardProps as Props } from './types';
import PageError from 'ui/PageError';
import ProjectBoardLists from './Lists/Lists';
import { useGetProjectQuery } from 'features/project/projectApiSlice';
import { useGetCardsQuery } from 'features/card/cardApiSlice';
import GlobalLoader from 'ui/GlobalLoader/GlobalLoader';

const ProjectBoard: React.FC<Props> = () => {
  const { currentProject } = useAppSelector((state) => state.project);
  const {
    data: project,
    isFetching: isFetchingProject,
    isSuccess: isSuccessProject,
    isError: isErrorProject,
    error: errorProject,
    refetchProject,
  } = useGetProjectQuery(currentProject._id);

  const {
    data: cards,
    isFetching: isFetchingCards,
    isSuccess: isSuccessCards,
    isError: isErrorCards,
    error: errorCards,
    refetchCards,
  } = useGetCardsQuery({ projectId: currentProject._id });

  if (isFetchingProject) {
    return <GlobalLoader />;
  }

  if (isErrorProject || isErrorCards) {
    return <PageError error={errorProject || errorCards} />;
  }

  return (
    <>
      <Breadcrumbs items={['Projects', project?.name, 'Kanban Board']} />
      <PageHeader name="Kanban Board" />
      <Filters />
      <ProjectBoardLists />
    </>
  );
};

export default React.memo(ProjectBoard);
