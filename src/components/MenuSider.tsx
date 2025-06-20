// src/components/MenuSider.tsx
import { Menu } from 'antd';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { currentUser, hasAccess } from '../access/rbac';
import { routes } from '../router/routes';

const MenuSider: React.FC = () => {
  const location = useLocation();
  return (
    <Menu mode="inline" selectedKeys={[location.pathname]}>
      {routes
        .filter((r) => hasAccess(r.path, currentUser))
        .map((route) => (
          <Menu.Item key={route.path}>
            <Link to={route.path}>{route.label}</Link>
          </Menu.Item>
        ))}
    </Menu>
  );
};

export default MenuSider;
