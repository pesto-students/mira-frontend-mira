import React from 'react';
import { createTheme } from '@mui/material';
import type { ThemeOptions } from '@mui/material';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import { LinkProps } from '@mui/material/Link';
import '@mui/lab/themeAugmentation';

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

LinkBehavior.displayName = 'LinkBehavior';

const themeOptions: ThemeOptions = {
  header: {
    height: '80px',
  },
  sidebar: {
    width: '290px',
    boxShadow:
      '2px 0 3px rgba(159, 162, 191, .18), 1px 0 1px rgba(159, 162, 191, 0.32)',
  },
  colors: {
    shadows: {
      primary:
        '0px 1px 4px rgba(85, 105, 255, 0.25), 0px 3px 12px 2px rgba(85, 105, 255, 0.35)',
    },
  },
  palette: {
    primary: {
      main: '#2151c5',
    },
    secondary: {
      main: '#f4f5f7',
    },
    background: {
      default: '#ffffff',
    },
    info: {
      main: '#33C2FF',
    },
    success: {
      main: '#57CA22',
    },
    warning: {
      main: '#FFA319',
    },
    error: {
      main: '#FF1943',
    },
    divider: '#f2f5f9',
  },
  typography: {
    fontFamily: '"Inder", sans-serif',
    h1: {
      fontFamily: "'IBM Plex Sans', sans-serif",
    },
    h2: {
      fontFamily: "'IBM Plex Sans', sans-serif",
    },
    h3: {
      fontFamily: "'IBM Plex Sans', sans-serif",
    },
    h4: {
      fontFamily: "'IBM Plex Sans', sans-serif",
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        size: 'small',
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: 'transparent',
      },
    },
    MuiList: {
      defaultProps: {
        dense: true,
      },
    },
    MuiMenuItem: {
      defaultProps: {
        dense: true,
      },
    },
    MuiTable: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiCheckbox: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiFab: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiFormControl: {
      defaultProps: {
        margin: 'dense',
        size: 'small',
      },
    },
    MuiFormHelperText: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiInputBase: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiInputLabel: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiRadio: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiSwitch: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTextField: {
      defaultProps: {
        margin: 'dense',
        size: 'small',
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
    },
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
  },
};

declare module '@mui/material/styles' {
  interface ThemeOptions {
    colors: {
      shadows: {
        primary: string;
      };
    };
  }
}

export default createTheme(themeOptions);
