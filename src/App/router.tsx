import BaseLayout from 'shared/components/layout/BaseLayout';
import Login from 'features/auth/Login';
import Register from 'features/auth/Register';
import Home from 'features/home';
import Status404 from 'features/home/Status404';
import type { RouteObject } from 'react-router';
import ProjectList from 'features/project/ProjectList';
import ProjectCreate from 'pages/project/ProjectCreate';
import ProjectEdit from 'pages/project/ProjectEdit';
import CardList from 'features/card/CardList';
import CardCreate from 'pages/card/CardCreate';
import CardEdit from 'pages/card/CardEdit';
import Hero from 'features/home/Hero';
import DashboardLayout from 'shared/components/layout/DashboardLayout/DashboardLayout';

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
            path: '/',
            element: <Hero />,
          },
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
    ],
  },
  {
    path: '',
    element: <DashboardLayout />,
    children: [
      {
        path: '/projects/list',
        element: <ProjectList />,
      },
      {
        path: '/projects/create',
        element: <ProjectCreate />,
      },
      {
        path: '/projects/:projectId/overview',
        element: <ProjectEdit />,
      },
      {
        path: '/projects/:projectId/cards/',
        element: <CardList />,
      },
      {
        path: '/projects/:projectId/cards/create',
        element: <CardCreate />,
      },
      {
        path: '/projects/:projectId/cards/:cardId',
        element: <CardEdit />,
      },
    ],
  },
];

export default router;
