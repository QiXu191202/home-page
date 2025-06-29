import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import AppLayout from '../App';
import HomePage from '@/pages/Home/Home';
import ListPage from '@/pages/List/List';
import DetailPage from '@/pages/Detail/Detail';
import NotFoundPage from '@/pages/NotFound/NotFound';

import CardsPage from '@/pages/Games/Cards/Cards';
import ShotsPage from '@/pages/Games/Shots/Shots';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/index" replace />, // 默认重定向到/home
      },
      {
        path: '/index',
        element: <HomePage />,
      },
      {
        path: 'list',
        element: <ListPage />,
      },
      {
        path: 'detail',
        element: <DetailPage />,
      },
      {
        path: 'cards',
        element: <CardsPage />,
      },
      {
        path: 'shots',
        element: <ShotsPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export function Router() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#409EFF',
          borderRadius: 4,
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}