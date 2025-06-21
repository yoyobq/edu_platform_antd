import { lazy } from 'react';
import MainLayout from '../layouts/MainLayout';

const Home = lazy(() => import('../pages/Home'));
const Admin = lazy(() => import('../pages/Admin/Admin'));
const Profile = lazy(() => import('../pages/Profile'));
const Login = lazy(() => import('../pages/Login'));

export const routes = [
  {
    path: '/',
    element: <Home />,
    label: '首页',
    permission: true,
    layout: MainLayout,
  },
  {
    path: '/admin',
    element: <Admin />,
    label: '后台管理',
    permission: (user: { roles: string | string[] }) => user.roles.includes('admin'),
    layout: MainLayout,
  },
  {
    path: '/profile',
    element: <Profile />,
    label: '个人信息',
    permission: true,
    layout: MainLayout,
  },
  {
    path: '/login',
    element: <Login />,
    label: '登录',
    permission: true,
    layout: null, // 不使用任何 layout
  },
];
