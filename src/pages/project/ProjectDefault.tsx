import React from 'react';
import Image from '/hero.png';
import { Box, Typography, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from 'App/hooks';

const StyledLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  '&:focus,&:hover,&:visited,&:link,&:active': {
    textDecoration: 'none',
  },
  color: theme.colors.primary,
}));

const StyledImage = styled('img')(({ theme }) => ({
  maxWidth: '50%',
}));

export default function ProjectDefault() {
  const { currentProject } = useAppSelector((state) => state.project);
  return (
    <Box
      sx={() => ({
        '&.MuiBox-root': {
          height: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        },
      })}
      component="div"
    >
      <StyledImage src={Image} alt="logo" />
      <Typography sx={{ maxWidth: '60%', padding: '10px', marginTop: '20px' }}>
        Mira let you <StyledLink to="/projects/create">create</StyledLink> and{' '}
        <StyledLink to={`/projects/${currentProject._id}/overview`}>
          manage
        </StyledLink>{' '}
        projects, very easy. Now you can create issues as{' '}
        <StyledLink to={`/projects/${currentProject._id}/cards/create`}>
          cards
        </StyledLink>{' '}
        and manage them using{' '}
        <StyledLink to={`/projects/${currentProject._id}/dashboard`}>
          interactive dashboard
        </StyledLink>
        .
      </Typography>
    </Box>
  );
}
