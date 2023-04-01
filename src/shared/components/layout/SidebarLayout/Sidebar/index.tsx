// import { useContext } from 'react';
// import Scrollbar from 'src/components/Scrollbar';
// import { SidebarContext } from 'src/contexts/SidebarContext';

import {
  Box,
  Drawer,
  alpha,
  styled,
  Divider,
  useTheme,
  Button,
  lighten,
  darken,
  Tooltip,
} from '@mui/material';

// import SidebarMenu from './SidebarMenu';
// import Logo from 'src/components/LogoSign';

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        min-width: ${theme.sidebar.width};
        color: ${theme.colors.alpha.trueWhite[70]};
        position: relative;
        z-index: 7;
        height: 100%;
        padding-bottom: 68px;
`,
);

function Sidebar() {
  // const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  // const closeSidebar = () => toggleSidebar();
  const theme = useTheme();

  return (
    <>
      <SidebarWrapper
        sx={{
          display: {
            xs: 'none',
            lg: 'inline-block',
          },
          position: 'fixed',
          left: 0,
          top: 0,
          background: darken(theme.palette.primary.main, 0.5),
          boxShadow: 'none',
        }}
      >
        {/* <Scrollbar> */}
        <Box mt={3}>
          <Box
            mx={2}
            sx={{
              width: 52,
            }}
          >
            {/* <Logo /> */}
            LOGO
          </Box>
        </Box>
        <Divider
          sx={{
            mt: theme.spacing(3),
            mx: theme.spacing(2),
            background: theme.palette.secondary.light,
          }}
        />
        {/* <SidebarMenu /> */}
        Add menu here
        {/* </Scrollbar> */}
        <Divider
          sx={{
            background: theme.palette.secondary.main,
          }}
        />
        <Box p={2}>
          <Button
            href="https://bloomui.com"
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            color="warning"
            size="small"
            fullWidth
          >
            Upgrade to PRO
          </Button>
        </Box>
      </SidebarWrapper>
      <Drawer
        sx={{
          boxShadow: `${theme.sidebar.boxShadow}`,
        }}
        anchor={'left'}
        // open={sidebarToggle}
        // onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper
          sx={{
            background: darken(theme.palette.secondary.main, 0.5),
          }}
        >
          {/* <Scrollbar> */}
          <Box mt={3}>
            <Box
              mx={2}
              sx={{
                width: 52,
              }}
            >
              {/* <Logo /> */}
              LOGO
            </Box>
          </Box>
          <Divider
            sx={{
              mt: theme.spacing(3),
              mx: theme.spacing(2),
              background: theme.palette.secondary.main,
            }}
          />
          {/* <SidebarMenu /> */}
          Add sidebar menu here
          {/* </Scrollbar> */}
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default Sidebar;
