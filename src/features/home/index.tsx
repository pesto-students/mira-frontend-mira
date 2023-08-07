import { Outlet } from 'react-router-dom';
import { Box, Container, Grid, styled } from '@mui/material';
import HeroImage from '/hero.png';

const HomeWrapper = styled(Box)(
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
    <HomeWrapper>
      <Container maxWidth="lg">
        <Grid container>
          <Grid
            container
            item
            xs={12}
            md={6}
            alignContent="center"
            display={{ xs: 'none', md: 'block' }}
          >
            <img
              src={HeroImage}
              height="auto"
              width={'100%'}
              alt="hero_image"
            />
          </Grid>

          <Grid item container xs={12} md={6} order={{ xs: 1 }}>
            <Outlet />
          </Grid>
        </Grid>
      </Container>
    </HomeWrapper>
  );
}

export default Home;
