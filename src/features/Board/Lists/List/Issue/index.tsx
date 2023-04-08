import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import {
  ArrowDownward as LowPriorityIcon,
  ArrowUpward as HighPriorityIcon,
} from '@mui/icons-material';

import { Box } from '@mui/material';

import {
  IssueLink,
  Issue,
  Title,
  Bottom,
  Assignees,
  AssigneeAvatar,
} from './Styles';
import { useAppSelector } from 'app/hooks';
import { CardPriority } from 'shared/constants/card';

const ProjectBoardListIssue = ({ card, index }) => {
  const allUsers = useAppSelector((state) => {
    return state.board.allUsers;
  });

  const assignees = allUsers.find((user) => user._id === card.assignee) || [];

  const renderPriorityIcon = (priority) => {
    switch (priority) {
      case CardPriority.LOW:
        return (
          <LowPriorityIcon sx={{ color: (theme) => theme.colors.primary }} />
        );
      case CardPriority.HIGH:
        return (
          <HighPriorityIcon sx={{ color: (theme) => theme.colors.danger }} />
        );
      default:
        return (
          <HighPriorityIcon sx={{ color: (theme) => theme.colors.warning }} />
        );
    }
  };

  return (
    <Draggable draggableId={card.id.toString()} index={index}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            display: 'block',
            marginBottom: '5px',
          }}
        >
          <Issue
            sx={
              snapshot.isDragging && !snapshot.isDropAnimating
                ? {
                    transform: 'rotate(3deg)',
                    boxShadow: '5px 10px 30px 0px rgba(9, 30, 66, 0.15)',
                  }
                : {}
            }
          >
            <Title>{card.title}</Title>

            <Bottom>
              <div>{renderPriorityIcon(card.priority)}</div>
              <Assignees>
                {[assignees].map((user) => (
                  <AssigneeAvatar
                    key={user.id}
                    sx={{ width: 24, height: 24 }}
                    src={user.imageUrl}
                    alt={user.firstName}
                  />
                ))}
              </Assignees>
            </Bottom>
          </Issue>
        </Box>
      )}
    </Draggable>
  );
};

export default ProjectBoardListIssue;
