import CssBaseline from '@mui/material/CssBaseline';
import { useRoutes } from 'react-router-dom';
import ThemeProvider from './theme/ThemeProvider';
import router from './router';

const App = () => {
  const content = useRoutes(router);

  return (
    <ThemeProvider>
      <CssBaseline />
      {content}
    </ThemeProvider>
  );
};

export default App;
