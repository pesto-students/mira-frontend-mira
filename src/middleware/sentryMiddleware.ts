import { captureException } from '@sentry/react';

const sentryMiddleware = (store) => (next) => (action) => {
  if (action.error) {
    const error = action.payload || new Error('API Error');
    captureException(error);
  }
  return next(action);
};

export default sentryMiddleware;
