import { styled } from '@mui/material/styles';

export const List = styled('div')(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  margin: 0 5px;
  min-height: 400px;
  width: 25%;
  border-radius: 3px;
  min-width: 265px;
  background: ${theme.colors.backgroundLightest};
`,
);

export const Title = styled('div')(
  ({ theme }) => `
  padding: 13px 10px 17px;
  text-transform: uppercase;
  color: ${theme.colors.textMedium};
  font-size: 12.5;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`,
);

export const IssuesCount = styled('span')`
  text-transform: lowercase;
  font-size: 13;
`;

export const Issues = styled('div')`
  height: 100%;
  padding: 0 5px;
`;
