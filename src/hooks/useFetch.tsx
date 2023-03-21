import { useState, useEffect } from 'react';

const useFetch = (path: string, method: string) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token') || '';
  const env = localStorage.getItem('env') || 'dev';
  const base_urls: Record<string, string> = {
    dev: 'https://dev--mira-backend.netlify.app/.netlify/functions/',
    prod: 'https://mira-backend.netlify.app/.netlify/functions/',
  };

  useEffect(() => {
    fetch(`${base_urls[env]}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json;charset=UTF-8',
      },
    })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error('could not fetch the data for that resource');
        }
        return res.json();
      })
      .then((data) => {
        setIsPending(false);
        setData(data.data.data);
        setError(null);
      })
      .catch((err) => {
        // auto catches network / connection error
        setIsPending(false);
        setError(err.message);
      });
  }, [path]);

  return { data, isPending, error };
};

export default useFetch;
