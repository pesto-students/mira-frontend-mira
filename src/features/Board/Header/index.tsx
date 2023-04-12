import { Box, Typography, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const ProjectBoardHeader = ({ name = 'Kanban board' }) => (
  <Box
    sx={{ marginTop: '6px', display: 'flex', justifyContent: 'space-between' }}
  >
    <Typography variant="h5" component="div">
      <Box fontWeight="fontWeightBold" display="inline">
        {name}
      </Box>
    </Typography>
  </Box>
);

export default ProjectBoardHeader;
