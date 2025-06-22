import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { currentUser, hasAccess } from '../../access/rbac';
import { routes, type RouteConfig } from '../../router/routes';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const MenuSider: React.FC = () => {
  const location = useLocation();

  const createMenuItem = (route: RouteConfig): MenuItem => {
    const { children, icon } = route;
    
    if (children && children.length > 0) {
      // 有子菜单的情况 - 过滤有权限的子菜单
      const filteredChildren = children
        .filter((child) => hasAccess(child.path, currentUser))
        .map((child) => ({
          key: child.path,
          label: <Link to={child.path}>{child.label}</Link>,
        }));
      
      // 只有当有可访问的子菜单时才显示父菜单
      if (filteredChildren.length > 0) {
        return {
          key: route.path,
          label: <Link to={route.path}>{route.label}</Link>,
          icon: icon, // 添加图标支持
          children: filteredChildren,
        };
      }
      return null;
    }
    
    // 普通菜单项
    return {
      key: route.path,
      label: <Link to={route.path}>{route.label}</Link>,
      icon: icon, // 添加图标支持
    };
  };

  const menuItems: MenuItem[] = routes
    .filter((route) => {
      // 如果是有子菜单的路由，检查是否有可访问的子菜单
      if (route.children && route.children.length > 0) {
        return route.children.some((child) => hasAccess(child.path, currentUser));
      }
      // 普通路由直接检查权限
      return hasAccess(route.path, currentUser);
    })
    .map((route) => createMenuItem(route))
    .filter((item): item is MenuItem => item !== null); // 过滤掉 null 值

  return (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      defaultOpenKeys={['/admin']} // 默认展开 admin 菜单
      items={menuItems}
    />
  );
};

export default MenuSider;
