// src/components/HeaderBar/HeaderBar.tsx
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, Typography } from 'antd';
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
      {/* 左侧 LOGO 和标题 */}
      <div className={styles.left}>
        <div className={styles.logo}>
          {/* LOGO图片 url 在 CSS 设置 */}
          <div className={styles.logoIcon}></div>
        </div>
        <Text className={styles.title}>Edu Platform</Text>
      </div>
      
      {/* 右侧用户信息 */}
      <div className={styles.right}>
        <Dropdown menu={{ items }} placement="bottomRight">
          <div className={styles.avatarWrapper}>
              <Avatar size="large" icon={<UserOutlined />} />
              <span className={styles.userName}>Alex</span>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default HeaderBar;
