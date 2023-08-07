// import moment from 'moment';
import { Droppable } from 'react-beautiful-dnd';

import { CardStatusCopy } from 'shared/constants/card';
// import Fuse from 'fuse.js';
// import { isAfter, subDays } from 'date-fns';

import Issue from './Issue/Issue';
import { List, Title, IssuesCount, Issues } from './Styles';
import { parseISO, isWithinInterval, endOfDay, addDays } from 'date-fns';
import { intersection } from 'lodash';

const ProjectBoardList = ({ status, cards = [], filters, currentUserId }) => {
  const filteredCards = filterCards(cards, filters, currentUserId);
  return (
    <Droppable key={status} droppableId={status}>
      {(provided) => (
        <List>
          <Title>
            {`${CardStatusCopy[status]} `}
            <IssuesCount>{filteredCards.length}</IssuesCount>
          </Title>
          <Issues {...provided.droppableProps} ref={provided.innerRef}>
            {filteredCards.length
              ? filteredCards.map((card, index) => {
                  return <Issue key={card._id} card={card} index={index} />;
                })
              : null}

            {provided.placeholder}
          </Issues>
        </List>
      )}
    </Droppable>
  );
};

const filterCards = (
  listCards: any,
  filters: Ifilters,
  currentUserId: string,
) => {
  const { searchTerm, userIds, myOnly, recent } = filters;
  let cards = listCards;

  if (searchTerm) {
    cards = cards.filter((card) =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }
  if (userIds.length > 0) {
    cards = cards.filter(
      (card) => intersection([card.assignee], userIds).length > 0,
    );
  }
  if (myOnly && currentUserId) {
    cards = cards.filter((card) => [card.assignee].includes(currentUserId));
  }
  if (recent) {
    cards = cards.filter((card) =>
      isWithinInterval(parseISO(card.estimatedDate?.toString() || ''), {
        start: new Date(),
        end: endOfDay(addDays(new Date(), 2)),
      }),
    );
  }

  return cards;
};

export default ProjectBoardList;
