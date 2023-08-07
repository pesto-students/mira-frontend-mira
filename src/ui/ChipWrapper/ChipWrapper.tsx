import React from 'react';
import type { SxProps, Theme, ChipProps } from '@mui/material';
import { Chip } from '@mui/material';

const styles: SxProps<Theme> = {
  mt: 0,
  mb: 0,
  backgroundColor: 'secondary.main',
  borderRadius: 1,
  '&:hover': {
    backgroundColor: 'secondary.light', //'#ebecf0',
  },
  '& input:focus': {
    backgroundColor: '#ffffff',
  },
};

const ChipWrapper: React.FC<ChipProps> = (props) => {
  const { ...chipProps } = props;

  return (
    <>
      <Chip sx={styles} {...chipProps} />
    </>
  );
};

export default ChipWrapper;
