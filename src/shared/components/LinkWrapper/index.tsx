import React from 'react';
import { Link } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';
import type { LinkTypeMap } from '@mui/material';

interface ILinkWrapper extends Partial<OverridableComponent<LinkTypeMap>> {
  children: React.ReactNode;
  href: string;
}

const index: React.FC<ILinkWrapper> = ({ children, ...props }) => {
  return (
    <Link
      underline="none"
      variant="body1"
      sx={{
        '&:hover': {
          color: 'primary.dark',
        },
      }}
      {...props}
    >
      {children}
    </Link>
  );
};

export default index;
