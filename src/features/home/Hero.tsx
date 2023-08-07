import { Link as RouterLink } from 'react-router-dom';
import { Button, Container, Grid, Typography, styled } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`,
);

const TypographyH2 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
`,
);

function Hero() {
  return (
    <Container maxWidth="lg" sx={{ margin: '50px 0px' }}>
      <Grid spacing={{ xs: 6, md: 10 }} container>
        <Grid item mx="auto">
          <TypographyH1 sx={{ mb: 2 }} variant="h1">
            Mira brings all your tasks, teammates, and tools together
          </TypographyH1>
          <TypographyH2
            sx={{ lineHeight: 1.5, pb: 4 }}
            variant="h4"
            color="text.secondary"
            fontWeight="normal"
          >
            MIRA is a lightweight task and project tracking tool. It allows teams to track and manage software development projects through an easy-to-use web interface. Teams can use
MIRA to create and assign tasks, manage groups of tasks and user stories, administer
and monitor the progress of projects, and generate reports. MIRA combines the
flexibility and power of an issue management tool with an elegant, intuitive interface that
makes project and issue tracking easy for teams.
          </TypographyH2>
          <Button
            component={RouterLink}
            to="/login"
            size="large"
            variant="contained"
            endIcon={<ArrowForwardIcon sx={{ transition: '2s' }} />}
            sx={{
              '&:hover .MuiButton-endIcon': {
                transform: 'translateX(5px)',
              },
              '&:hover ': {
                transform: 'scale(1.1)',
              },
            }}
          >
            Get Started
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
