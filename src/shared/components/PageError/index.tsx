import {
  ErrorPage,
  ErrorPageInner,
  ErrorBox,
  StyledBugIcon,
  Title,
} from './Styles';

const PageError = () => (
  <ErrorPage>
    <ErrorPageInner>
      <ErrorBox>
        <StyledBugIcon />
        <Title>There’s been a glitch…</Title>
        <p>
          We’re not quite sure what went wrong. Please <a href="/">reload</a> or
          try looking on our{' '}
          <a href="https://support.atlassian.com/jira-software-cloud/">
            Help Center
          </a>
          {' if you need a hand.'}
        </p>
      </ErrorBox>
    </ErrorPageInner>
  </ErrorPage>
);

export default PageError;
