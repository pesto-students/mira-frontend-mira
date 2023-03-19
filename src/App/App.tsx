import CssBaseline from '@mui/material/CssBaseline';
import { useRoutes } from 'react-router-dom';
import ThemeProvider from './theme/ThemeProvider';
import { Provider } from 'react-redux';
import router from './router';
import store from './store';

const App = () => {
  const content = useRoutes(router);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <CssBaseline />
        {content}
      </ThemeProvider>
    </Provider>
  );
};

export default App;
