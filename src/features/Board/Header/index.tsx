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

    <Button
      href="https://github.com/pesto-students/mira-frontend-mira"
      target="_blank"
      rel="noreferrer noopener"
      variant="outlined"
      startIcon={<GitHubIcon />}
    >
      Github Repo
    </Button>
  </Box>
);

export default ProjectBoardHeader;
