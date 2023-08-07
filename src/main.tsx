import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from 'App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'https://c60a4c937e3c4859be6577cd95a0fdad@o4505017424674816.ingest.sentry.io/4505017426706432',
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  // </React.StrictMode>,
);
