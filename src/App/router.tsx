import BaseLayout from 'shared/components/layout/BaseLayout';
import Login from 'features/auth/Login';
import Register from 'features/auth/Register';
import Home from 'features/home';
import Status404 from 'features/home/Status404';
import type { RouteObject } from 'react-router';
import ProjectList from 'features/project/ProjectList';
import ProjectCreate from 'pages/project/ProjectCreate';
import ProjectEdit from 'pages/project/ProjectEdit';

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
          {
            path: '/project-create',
            element: <ProjectCreate />,
          },
          {
            path: '/project-edit/:projectId',
            element: <ProjectEdit />,
          },
          {
            path: '/project-list',
            element: <ProjectList />,
          },
        ],
      },
      {
        path: '*',
        element: <Status404 />,
      },
    ],
  },
];

export default router;
