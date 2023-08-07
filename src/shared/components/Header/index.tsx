import { MouseEvent, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ButtonWrapper from '../ButtonWrapper';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '/mira.png';

import { useAppSelector, useAppDispatch } from 'App/hooks';
// import { useGetUserDetailsQuery } from 'features/auth/authService';
import { logout, setCredentials } from 'features/auth/authSlice';

const pages = [
  {
    name: 'Login',
    to: '/login',
  },
  {
    name: 'Register',
    to: '/sign-up',
  },
];

function Header() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const { userInfo, userToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        marginTop: 3,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar>
          <a href="/">
            <img src={Logo} alt="logo" height={70} />
          </a>
          <Box
            sx={{
              flexGrow: 1,
              flexDirection: 'row-reverse',
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(({ name, to }) => (
                <MenuItem
                  key={name}
                  onClick={handleCloseNavMenu}
                  component={RouterLink}
                  to={to}
                >
                  <Typography textAlign="center">{name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              flexDirection: 'row-reverse',
              display: { xs: 'none', md: 'flex' },
            }}
          >
            {pages.map(({ name, to }) => (
              <ButtonWrapper
                key={name}
                onClick={handleCloseNavMenu}
                sx={{
                  p: 2,
                  m: 1,
                  color: 'black',
                  display: 'block',
                  backgroundColor:
                    location.pathname === to
                      ? 'secondary.light'
                      : 'transparent',
                }}
                component={RouterLink}
                to={to}
              >
                <Typography>{name}</Typography>
              </ButtonWrapper>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
