import BaseLayout from 'shared/components/layout/BaseLayout';
import Login from 'features/auth/Login';
import Register from 'features/user/Register';
import Home from 'features/home';
import Status404 from 'features/home/Status404';
import type { RouteObject } from 'react-router';
import ProjectCreate from 'pages/project/ProjectCreate';
import ProjectEdit from 'pages/project/ProjectEdit';
import ProjectDefault from 'pages/project/ProjectDefault';
import CardList from 'features/card/CardList';
import CardCreate from 'pages/card/CardCreate';
import CardEdit from 'pages/card/CardEdit';
import Hero from 'features/home/Hero';
import DashboardLayout from 'shared/components/layout/DashboardLayout/DashboardLayout';
import ProtectedRoutes from 'components/ProtectedRoutes';
import Logout from 'components/Logout';
import ProjectBoard from 'features/Board/ProjectBoard';
import ProfileEdit from 'features/user/ProfileEdit';
import TempDrawer from 'components/temp/tempDrawer';

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
          {
            path: '/profile',
            element: <ProfileEdit />,
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
    path: '/temp',
    element: <TempDrawer />,
  },
  {
    path: '/projects',
    element: <ProtectedRoutes />,
    children: [
      {
        path: '',
        element: <DashboardLayout />,
        children: [
          {
            path: '',
            element: <ProjectDefault />,
          },
          {
            path: 'create',
            element: <ProjectCreate />,
          },
          {
            path: ':projectId',
            element: <ProjectBoard />,
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