import { DragDropContext, DraggableLocation } from 'react-beautiful-dnd';
import { CardStatus } from 'shared/constants/card';

import List from './List/List';
import { Lists } from './Styles';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'App/hooks';

import { Icard } from 'App/types';
import { Ifilters } from 'features/Board/types';
import type { DropResult } from 'react-beautiful-dnd';
import { useGetCardsQuery } from 'features/card/cardApiSlice';
import { useUpdateCardMutation } from 'features/card/cardApiSlice';
import { useSnackbar } from 'notistack';

interface IlistCardsMap {
  [k: string]: Icard[];
}

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

const ProjectBoardLists = () => {
  const { filterBar: filters, auth } = useAppSelector((state) => state);
  const { currentProject } = useAppSelector((state) => state.project);
  const {
    data: cards,
    isSuccess,
    isFetching: isFetchingCards,
  } = useGetCardsQuery({
    projectId: currentProject._id,
  });
  const { enqueueSnackbar } = useSnackbar();

  const [filteredListCardsMap, setFilteredListCardsMap] =
    useState<IlistCardsMap | null>(null);

  useEffect(() => {
    if (!isFetchingCards && isSuccess) {
      const arrangedCards = getArrangedListCards(cards.data.data);
      setFilteredListCardsMap(arrangedCards);
    }
  }, [isFetchingCards, currentProject._id]);

  const [
    updateCard,
    {
      data: response,
      isLoading: isProcessing,
      isSuccess: isSuccessUpdate,
      error: errorUpdate,
      isError: isErrorUpdate,
      reset,
    },
  ] = useUpdateCardMutation();

  useEffect(() => {
    if (isErrorUpdate) {
      displayStatus(enqueueSnackbar, 'error', errorUpdate);
    }
    if (isSuccessUpdate) {
      displayStatus(
        enqueueSnackbar,
        'success',
        'Successfully updated the Card',
      );
    }
  }, [isProcessing]);

  const handleIssueDrop = ({
    draggableId,
    destination,
    source,
  }: DropResult) => {
    if (!isPositionChanged(source, destination)) return;
    setFilteredListCardsMap((prev) => getNewState(prev, destination, source));
    // call api to update
    updateCard({
      projectId: currentProject._id,
      id: draggableId,
      payload: { status: destination.droppableId },
    });
    // revert if api fails
  };

  return (
    <DragDropContext onDragEnd={handleIssueDrop}>
      <Lists>
        {Object.values(CardStatus).map((status) => {
          return (
            <List
              key={status}
              status={status}
              cards={filteredListCardsMap?.[status] || []}
              filters={filters}
              currentUserId={auth.userInfo._id}
            />
          );
        })}
      </Lists>
    </DragDropContext>
  );
};

const getArrangedListCards = (cards: Icard[]) => {
  const map: IlistCardsMap = Object.fromEntries(
    Object.values(CardStatus).map((status) => [status, []]),
  );
  cards.forEach((card) => {
    const status = card.status || CardStatus.BACKLOG;
    if (status in map) {
      map[status].push(card);
    }
  });

  return map;
};

const isPositionChanged = (
  destination: DraggableLocation | null | undefined,
  source: DraggableLocation,
) => {
  if (!destination) return false;
  const isSameList = destination.droppableId === source.droppableId;
  const isSamePosition = destination.index === source.index;
  return !isSameList || !isSamePosition;
};

const getNewState = (
  prevState: IlistCardsMap,
  destination: DraggableLocation,
  source: DraggableLocation,
) => {
  const allCardsInSource = prevState[source.droppableId],
    allCardsInDestination = prevState[destination.droppableId],
    draggedCard = { ...allCardsInSource[source.index] };
  allCardsInSource.splice(source.index, 1);
  if (destination.droppableId === source.droppableId) {
    allCardsInSource.splice(destination.index, 0, draggedCard);
  } else {
    allCardsInDestination.splice(destination.index, 0, draggedCard);
  }
  return { ...prevState };
};

export default React.memo(ProjectBoardLists);
