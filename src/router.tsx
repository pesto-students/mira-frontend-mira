import type { RouteObject } from 'react-router';

import BaseLayout from 'ui/layout/BaseLayout';
import DashboardLayout from 'ui/layout/DashboardLayout/DashboardLayout';
import ProtectedRoutes from 'features/route/ProtectedRoutes';

import LoginPage from 'pages/auth/LoginPage';
import RegisterPage from 'pages/user/RegisterPage';
import CardListPage from 'pages/card/CardListPage';
import ProjectBoardPage from 'pages/project/ProjectBoardPage';
import HomePage from 'pages/HomePage';
import Status404Page from 'pages/Status404Page';
import ProjectCreatePage from 'pages/project/ProjectCreatePage';
import ProjectEditPage from 'pages/project/ProjectEditPage';
import ProjectDefaultPage from 'pages/project/ProjectDefaultPage';
import CardCreatePage from 'pages/card/CardCreatePage';
import CardEditPage from 'pages/card/CardEditPage';
import Hero from 'pages/Hero';
import ProfileEditPage from 'pages/user/ProfileEditPage';
import LogoutPage from 'pages/auth/LogoutPage';

const router: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        children: [
          {
            path: '/',
            element: <Hero />,
          },
          {
            path: '/sign-up',
            element: <RegisterPage />,
          },
          {
            path: '/login',
            element: <LoginPage />,
          },
          {
            path: '/create-project',
            element: <ProjectCreatePage />,
          },
          {
            path: '/profile',
            element: <ProfileEditPage />,
          },
        ],
      },
      {
        path: '*',
        element: <Status404Page />,
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
          {
            path: '',
            element: <ProjectDefaultPage />,
          },
          {
            path: 'create',
            element: <ProjectCreatePage />,
          },
          {
            path: ':projectId',
            element: <ProjectBoardPage />,
          },
          {
            path: ':projectId/dashboard',
            element: <ProjectBoardPage />,
          },
          {
            path: ':projectId/overview',
            element: <ProjectEditPage />,
          },
          {
            path: ':projectId/cards/',
            element: <CardListPage />,
          },
          {
            path: ':projectId/cards/create',
            element: <CardCreatePage />,
          },
          {
            path: ':projectId/cards/:cardId',
            element: <CardEditPage />,
          },
        ],
      },
    ],
  },
  {
    path: '/logout',
    element: <LogoutPage />,
  },
];

export default router;
