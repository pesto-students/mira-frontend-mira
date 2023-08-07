import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout } from 'features/auth/authSlice';

const getBaseUrl = () => {
  if (localStorage.getItem('env') == 'dev') {
    return 'https://dev--mira-backend.netlify.app/.netlify/functions/api/v1/';
  }
  if (localStorage.getItem('env') == 'local') {
    return 'http://localhost:8000/api/v1/';
  }
  return 'https://mira-backend.netlify.app/.netlify/functions/api/v1/';
};

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
      return headers;
    }
  },
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const response = await baseQuery(args, api, extraOptions);

  if (response?.error) {
    if (response?.error?.status == 401) {
      api.dispatch(logout());
    }
    return { error: response?.error?.data?.message || 'Something went wrong' };
  }

  return response;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({}),
});
