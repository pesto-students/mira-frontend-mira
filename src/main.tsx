import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from 'App/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'App/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  // </React.StrictMode>,
);
