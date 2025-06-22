import { HomeOutlined, LoginOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { lazy } from 'react';
import MainLayout from '../layouts/MainLayout';
import { type RouteConfig } from './types';

const Home = lazy(() => import('../pages/Home'));
// const Admin = lazy(() => import('../pages/Admin/Admin'));
const UsersManagement = lazy(() => import('../pages/admin/UsersManagement/UsersManagement'));
const Settings = lazy(() => import('../pages/admin/Settings/Settings'));
const Profile = lazy(() => import('../pages/Profile'));
const Login = lazy(() => import('../pages/Login'));

const routes: RouteConfig[] = [
  {
    path: '/',
    element: <Home />,
    label: '首页',
    permission: true,
    layout: MainLayout,
    icon: <HomeOutlined />,
  },
  {
    path: '/admin',
    element: <Settings />,
    label: '后台管理',
    permission: 'canAdmin', // 使用 AccessPermissions 中的权限键
    layout: MainLayout,
    icon: <SettingOutlined />,
    children: [
      {
        path: '/admin/users',
        element: <UsersManagement />,
        label: '用户管理',
        permission: 'canAdmin', // 使用 AccessPermissions 中的权限键
        layout: MainLayout,
      },
      {
        path: '/admin/settings',
        element: <Settings />,
        label: '系统设置',
        permission: 'canAdmin', // 使用 AccessPermissions 中的权限键
        layout: MainLayout,
      },
    ],
  },
  {
    path: '/profile',
    element: <Profile />,
    label: '个人信息',
    permission: true,
    layout: MainLayout,
    icon: <UserOutlined />,
  },
  {
    path: '/login',
    element: <Login />,
    label: '登录',
    permission: true,
    layout: null,
    icon: <LoginOutlined />,
  },
];

// 修改扁平化辅助函数 - 包含所有路由（父路由和子路由）
const flattenRoutes = (routes: RouteConfig[]): RouteConfig[] => {
  const result: RouteConfig[] = [];

  for (const route of routes) {
    // 添加当前路由（包括父路由）
    result.push(route);
    
    // 如果有子路由，递归添加子路由
    if (route.children && route.children.length > 0) {
      result.push(...flattenRoutes(route.children));
    }
  }

  return result;
};

export { flattenRoutes, routes };
export type { RouteConfig };

