import { styled } from '@mui/material/styles';

export const Container = styled('div')(
  ({ theme }) => `
  color: ${theme.palette.text.primary},
  font-size: 15px,
`,
);

export const Divider = styled('span')({
  position: 'relative',
  top: '2px',
  margin: '0 10px',
  fontSize: '18px',
});
