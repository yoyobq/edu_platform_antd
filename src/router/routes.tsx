// src/router/routes.tsx
import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home'));
const Admin = lazy(() => import('../pages/Admin'));
const Profile = lazy(() => import('../pages/Profile'));
const Login = lazy(() => import('../pages/Login'));

export const routes = [
  { path: '/', element: <Home />, label: '首页', permission: true },
  { path: '/admin', element: <Admin />, label: '后台管理', permission: (user: { roles: string | string[]; }) => user.roles.includes('admin') },
  { path: '/profile', element: <Profile />, label: '个人信息', permission: true },
  { path: '/login', element: <Login />, label: '登录', permission: true },
];
