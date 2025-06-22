import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { currentUser, hasAccess } from '../../access/rbac';
import { routes, type RouteConfig } from '../../router/routes';


type MenuItem = Required<MenuProps>['items'][number];

const MenuSider: React.FC = () => {
  const location = useLocation();

  const createMenuItem = (route: RouteConfig): MenuItem | null => {
    const { children, icon } = route;

    if (children?.length) {
      const childrenItems = children
        .filter((child) => hasAccess(child.path, currentUser))
        .map((child) => ({
          key: child.path,
          label: <Link to={child.path}>{child.label}</Link>,
        }));

      if (childrenItems.length === 0) return null;

      return {
        key: route.path,
        label: route.label, // 父级不跳转
        icon,
        children: childrenItems,
      };
    }

    if (hasAccess(route.path, currentUser)) {
      return {
        key: route.path,
        label: <Link to={route.path}>{route.label}</Link>,
        icon,
      };
    }

    return null;
  };

  const menuItems: MenuItem[] = routes
    .map((r) => createMenuItem(r))
    .filter((i): i is MenuItem => i !== null);

  return (
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={['/admin']}
        items={menuItems}
      />
  );
};

export default MenuSider;
