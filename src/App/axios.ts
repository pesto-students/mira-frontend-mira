import axios from 'axios';

const token = localStorage.getItem('token');

axios.interceptors.request.use(
  (config) => {
    if (config.method === 'post') {
      config.headers['Content-Type'] = 'application/json';
    }
    console.log('Intercepted request', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const request = axios.create({
  baseURL: 'https://dev--mira-backend.netlify.app/.netlify/functions/api/v1',
  headers: { Authorization: `Bearer ${token}` },
  timeout: 4000,
});
