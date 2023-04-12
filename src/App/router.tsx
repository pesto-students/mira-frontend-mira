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
import ProtectedRoutes from 'components/ProtectedRoutes';
import Logout from 'components/Logout';
import ProjectBoard from 'features/Board';

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
          {
            path: '/create-project',
            element: <ProjectCreate />,
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
    path: '/projects',
    element: <ProtectedRoutes />,
    children: [
      {
        path: '',
        element: <DashboardLayout />,
        children: [
          // {
          //   path: 'list',
          //   element: <ProjectList />,
          // },
          {
            path: 'create',
            element: <ProjectCreate />,
          },
          {
            path: ':projectId/dashboard',
            element: <ProjectBoard />,
          },
          {
            path: ':projectId/overview',
            element: <ProjectEdit />,
          },
          {
            path: ':projectId/cards/',
            element: <CardList />,
          },
          {
            path: ':projectId/cards/create',
            element: <CardCreate />,
          },
          {
            path: ':projectId/cards/:cardId',
            element: <CardEdit />,
          },
        ],
      },
    ],
  },
  {
    path: '/logout',
    element: <Logout />,
  },
];

export default router;
