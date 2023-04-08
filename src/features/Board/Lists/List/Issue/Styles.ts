import { HTMLAttributes } from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Avatar, Box } from '@mui/material';

export const IssueLink = styled(Link)`
  display: block;
  margin-bottom: 5px;
`;

// interface IIssueProps extends HTMLAttributes<HTMLDivElement> {
//   isBeingDragged: boolean;
// }

export const Issue = styled(Box)(
  ({ theme }) => `
  padding: 10px;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(9, 30, 66, 0.25);
  transition: background 0.1s;
  cursor: pointer;
  user-select: none;
  @media (max-width: 1100px) {
    padding: 10px 8px;
  }
  &:hover {
    background: ${theme.colors.backgroundLight};
  } 
`,
);

export const Title = styled('p')`
  padding-bottom: 11px;
  font-size: 15;
  margin: 0px;
  @media (max-width: 1100px) {
    font-size: 14.5;
  }
`;

export const Bottom = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Assignees = styled('div')`
  display: flex;
  flex-direction: row-reverse;
  margin-left: 2px;
`;

export const AssigneeAvatar = styled(Avatar)`
  margin-left: -2px;
  box-shadow: 0 0 0 2px #fff;
`;
