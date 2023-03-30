import { Outlet, useLocation } from 'react-router-dom';
import { Box, Container, Grid, styled } from '@mui/material';
import Hero from './Hero';
import HeroImage from 'app/assets/hero.png';

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
  const location = useLocation();
  // const content = [
  //   '/sign-up',
  //   '/login',
  //   '/project-create',
  //   '/project-list', //TODO: remove it
  // ].includes(location.pathname) ? (
  //   <Outlet />
  // ) : (
  //   <Hero />
  // );
  const content = <Outlet />; //TODO: remove this and restore above

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
            {content}
          </Grid>
        </Grid>
      </Container>
    </HomeWrapper>
  );
}

export default Home;
