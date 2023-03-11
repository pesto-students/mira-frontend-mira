import Header from 'components/common/Header';
import {
  BrowserRouter as Router,
  Routes as AppRoutes,
  Route,
} from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Router>
        <AppRoutes>
          <Route path="/" element={<Home />} />
        </AppRoutes>
      </Router>
    </div>
  );
};

export default App;
