import { DragDropContext, DraggableLocation } from 'react-beautiful-dnd';
// import {
//   moveItemWithinArray,
//   insertItemIntoArray,
// } from 'shared/helpers/common';
import { CardStatus } from 'shared/constants/card';

import List from './List';
import { Lists } from './Styles';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchCards } from './ListsSlice';

import { Icard } from 'app/types';
import { Ifilters } from 'features/Board/types';
import type { DropResult } from 'react-beautiful-dnd';

interface IlistCardsMap {
  [k: string]: Icard[];
}

const ProjectBoardLists = () => {
  const dispatch = useAppDispatch();
  const { filterBar: filters, card, auth } = useAppSelector((state) => state);

  const [filteredListCardsMap, setFilteredListCardsMap] =
    useState<IlistCardsMap | null>(null);

  useEffect(() => {
    dispatch(fetchCards());
  }, []);

  useEffect(() => {
    let allCards = card.cards;
    if (allCards && allCards.length) {
      const arrangedCards = getArrangedListCards(allCards);
      setFilteredListCardsMap(arrangedCards);
    }
  }, [card.cards]);

  const handleIssueDrop = ({
    draggableId,
    destination,
    source,
  }: DropResult) => {
    if (!isPositionChanged(source, destination)) return;
    const issueId = Number(draggableId);
    setFilteredListCardsMap((prev) => getNewState(prev, destination, source));
    // call api to update
    // revert if api fails
  };

  return (
    <DragDropContext onDragEnd={handleIssueDrop}>
      <Lists>
        {Object.values(CardStatus).map((status) => (
          <List
            key={status}
            status={status}
            cards={filteredListCardsMap?.[status] || undefined}
            filters={filters}
            currentUserId={auth.user.id}
          />
        ))}
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
