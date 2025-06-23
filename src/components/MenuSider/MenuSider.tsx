// src/MenuSider/MenuSider.tsx
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppState } from '../../hooks/useAppState';
import { routes, type RouteConfig } from '../../router/routes';
import styles from './MenuSider.module.css';

type MenuItem = Required<MenuProps>['items'][number];

const MenuSider: React.FC = () => {
  const location = useLocation();
  const { access } = useAppState();

  // 判断是否允许显示该路由
  const hasPermission = (permission: RouteConfig['permission']) => {
    if (typeof permission === 'boolean') return permission;
    if (typeof permission === 'string') return access[permission];
    return false;
  };

  // 判断路由是否应该显示在菜单中
  const shouldShowInMenu = (route: RouteConfig) => {
    // 过滤掉 layout 为 null 的路由（如登录页面）
    return route.layout !== null && hasPermission(route.permission);
  };

  const createMenuItem = (route: RouteConfig): MenuItem | null => {
    const { children, icon, permission, layout } = route;

    // 如果路由本身不应该显示在菜单中，直接返回 null
    if (layout === null) return null;

    if (children?.length) {
      const childrenItems = children
        .filter((child) => shouldShowInMenu(child))
        .map((child) => ({
          key: child.path,
          label: <Link to={child.path}>{child.label}</Link>,
        }));

      if (childrenItems.length === 0) return null;

      return {
        key: route.path,
        label: route.label,
        icon,
        children: childrenItems,
      };
    }

    if (hasPermission(permission)) {
      return {
        key: route.path,
        label: <Link to={route.path}>{route.label}</Link>,
        icon,
      };
    }

    return null;
  };

  const menuItems: MenuItem[] = routes
    .map(createMenuItem)
    .filter((item): item is MenuItem => item !== null);

  return (
    <div className={styles.menuSider}>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={['/admin']}
        items={menuItems}
        style={{ borderInlineEndWidth: 0 }}
      />
    </div>
  );
};

export default MenuSider;
