export const CardType = {
  TASK: 'task',
  BUG: 'bug',
  STORY: 'story',
};

export const CardStatus = {
  BACKLOG: 'backlog',
  SELECTED: 'ready2deploy',
  INPROGRESS: 'in progress',
  DONE: 'done',
};

export const CardPriority = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
};

export const CardTypeCopy = {
  [CardType.TASK]: 'Task',
  [CardType.BUG]: 'Bug',
  [CardType.STORY]: 'Story',
};

export const CardStatusCopy = {
  [CardStatus.BACKLOG]: 'Backlog',
  [CardStatus.SELECTED]: 'Selected for development',
  [CardStatus.INPROGRESS]: 'In progress',
  [CardStatus.DONE]: 'Done',
};

export const CardPriorityCopy = {
  [CardPriority.HIGH]: 'High',
  [CardPriority.MEDIUM]: 'Medium',
  [CardPriority.LOW]: 'Low',
};
