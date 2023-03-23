import BaseLayout from 'components/layout/BaseLayout';
import DashboardLayout from 'components/layout/DashboardLayout';
import Login from 'components/Login';
import Register from 'components/Register';
import Home from 'pages/Home/Home';
import PageProjectList from 'pages/project/list';
import PageProjectCreate from 'pages/project/create';
import PageProjectDetails from 'pages/project/details';
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
          {
            path: '/onboard/create-project',
            element: <PageProjectCreate />,
          },
        ],
      },
    ],
  },
  {
    path: '',
    element: <DashboardLayout />,
    children: [
      {
        path: '/projects/list',
        element: <PageProjectList />,
      },
      {
        path: '/projects/create',
        element: <PageProjectCreate />,
      },
      {
        path: '/projects/:projectId',
        element: <PageProjectDetails />,
      },
    ],
  },
];

export default router;
