import { Box, Typography, Container } from '@mui/material';

import statusImg from 'App/assets/404.svg';

import { styled } from '@mui/material/styles';
import ButtonWrapper from 'shared/components/ButtonWrapper';

const MainContent = styled(Box)(
  ({ theme }) => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`,
);

function Status404() {
  return (
    <>
      <MainContent>
        <Container maxWidth="md">
          <Box textAlign="center">
            <img alt="404" height={180} src={statusImg} />
            <Typography variant="h2" sx={{ my: 2 }}>
              {`The page you were looking for doesn't exist.`}
            </Typography>
            <Typography variant="h5" color="text.secondary" fontWeight="normal">
              {`Please click on the button below to start your journey with MIRA`}
            </Typography>
          </Box>
          <Container sx={{ textAlign: 'center', mt: 1, p: 4 }} maxWidth="sm">
            <ButtonWrapper href="/" variant="outlined">
              Go to homepage
            </ButtonWrapper>
          </Container>
        </Container>
      </MainContent>
    </>
  );
}

export default Status404;
