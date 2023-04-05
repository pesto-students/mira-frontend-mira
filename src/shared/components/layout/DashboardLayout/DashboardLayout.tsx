import { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import { Box, styled, Container } from '@mui/material';

interface DashboardLayoutProps {
  children?: ReactNode;
}

const DashboardWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
    margin-top: 20px;
`,
);

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        flex: 1,
        height: '100%',
      }}
    >
      <DashboardWrapper>
        <Container maxWidth="lg">{children || <Outlet />}</Container>
      </DashboardWrapper>
    </Box>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default DashboardLayout;
