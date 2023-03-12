import BaseLayout from 'components/layout/BaseLayout';
import Login from 'components/Login';
import Register from 'components/Register';
import Home from 'pages/Home/Home';
import type { RouteObject } from 'react-router';

const router: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
        children: [
          {
            path: '/sign-up',
            element: <Register />,
          },
          {
            path: '/login',
            element: <Login />,
          },
        ],
      },
    ],
  },
];

export default router;
