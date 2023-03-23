import { Outlet, useLocation } from 'react-router-dom';
import { Box, Container, Grid, styled } from '@mui/material';

const DashboardWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
    margin-top: 20px;
`,
);

function Home() {
  return (
    <DashboardWrapper>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item container xs={12} md={6} order={{ xs: 1 }}>
            <Outlet />
          </Grid>
        </Grid>
      </Container>
    </DashboardWrapper>
  );
}

export default Home;
