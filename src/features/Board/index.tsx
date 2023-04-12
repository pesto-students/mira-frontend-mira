import React, { useEffect } from 'react';

import Breadcrumbs from 'shared/components/Breadcrumbs';

import Header from './Header';
import Filters from './Filters';
import { useAppDispatch, useAppSelector } from 'App/hooks';

import type { IProjectBoardProps as Props } from './types';
import PageError from 'shared/components/PageError';
import ProjectBoardLists from './Lists';
import { useGetProjectQuery } from 'features/project/projectApiSlice';
import { useGetCardsQuery } from 'features/card/cardApiSlice';
import BackdropWrapper from 'shared/components/BackdropWrapper/BackdropWrapper';
import GlobalLoader from 'components/GlobalLoader/GlobalLoader';

const ProjectBoard: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

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

  // console.log(currentProject.name, cards);

  return (
    <>
      <Breadcrumbs items={['Projects', project?.name, 'Kanban Board']} />
      <Header name="Kanban Board" />
      <Filters />
      <ProjectBoardLists />
    </>
  );
};

export default React.memo(ProjectBoard);
