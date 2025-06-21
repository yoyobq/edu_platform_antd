// src/components/HeaderBar/HeaderBar.tsx
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, Space, Typography } from 'antd';
import React from 'react';
import styles from './HeaderBar.module.css';

const { Text } = Typography;

const HeaderBar: React.FC = () => {
  const handleLogout = () => {
    console.log('Logout clicked');
  };

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      label: '个人信息',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      label: (
        <span onClick={handleLogout}>
          <LogoutOutlined /> 退出登录
        </span>
      ),
    },
  ];

  return (
    <div className={styles.header}>
      <div className={styles.right}>
        <Dropdown menu={{ items }} placement="bottomRight">
          <Space className={styles.avatarWrapper}>
            <Avatar size="small" icon={<UserOutlined />} />
            <Text className={styles.userName}>Alex</Text>
          </Space>
        </Dropdown>
      </div>
    </div>
  );
};

export default HeaderBar;
