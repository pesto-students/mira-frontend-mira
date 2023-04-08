import BaseLayout from 'shared/components/layout/BaseLayout';
import Login from 'features/auth/Login';
import Register from 'features/auth/Register';
import Home from 'features/home';
import Status404 from 'features/home/Status404';
// types
import type { RouteObject } from 'react-router';
import ProjectBoard from 'features/Board';
import SidebarLayout from 'shared/components/layout/SidebarLayout';

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
      {
        path: '*',
        element: <Status404 />,
      },
      {
        path: 'project',
        element: <SidebarLayout />,
        children: [
          {
            path: ':id',
            element: <ProjectBoard />,
          },
        ],
      },
    ],
  },
];

export default router;
