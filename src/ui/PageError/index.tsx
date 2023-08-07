import {
  ErrorPage,
  ErrorPageInner,
  ErrorBox,
  StyledBugIcon,
  Title,
} from './Styles';

const PageError = ({ error }) => (
  <ErrorPage>
    <ErrorPageInner>
      <ErrorBox>
        <StyledBugIcon />
        <Title>There’s been a glitch…</Title>
        <p>{error || 'We’re not quite sure what went wrong'}</p>
      </ErrorBox>
    </ErrorPageInner>
  </ErrorPage>
);

export default PageError;
