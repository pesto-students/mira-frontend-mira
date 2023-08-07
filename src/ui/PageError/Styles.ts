import { styled } from '@mui/material/styles';
import BugReportIcon from '@mui/icons-material/BugReport';
import imageBackground from './assets/background-forest.jpg';

export const ErrorPage = styled('div')`
  padding: 64px;
`;

export const ErrorPageInner = styled('div')(
  ({ theme }) =>
    `
  // margin: 0 auto;
  max-width: 1440px;
  padding: 200px 0;
  background-image: url('${imageBackground}');
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: ${theme.colors.backgroundLight};

  @media (max-height: 680px) {
    padding: 140px 0;
  }
`,
);

export const ErrorBox = styled('div')(
  ({ theme }) => `
  position: relative;
  margin: 0 auto;
  max-width: 480px;
  padding: 32px;
  border-radius: 3px;
  border: 1px solid ${theme.colors.borderLight};
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.25);
  background: rgba(255, 255, 255, 0.9);
`,
);

export const StyledBugIcon = styled(BugReportIcon)(
  ({ theme }) => `
  position: absolute;
  top: 32px;
  left: 32px;
  font-size: 30px;
  color: ${theme.palette.primary.main};
`,
);

export const Title = styled('h1')(
  ({ theme }) => `
  margin-bottom: 16px;
  padding-left: 42px;
  font-size: 29;
`,
);
