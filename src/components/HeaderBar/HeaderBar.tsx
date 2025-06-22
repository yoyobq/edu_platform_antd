// src/components/HeaderBar/HeaderBar.tsx
import { LogoutOutlined, UserOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, Typography, Button } from 'antd';
import React from 'react';
import { useAppState } from '../../hooks/useAppState';
import styles from './HeaderBar.module.css';

const { Text } = Typography;

const HeaderBar: React.FC = () => {
  const appState = useAppState();
  
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
    <div className={styles.barContent}>
      {/* 左侧 LOGO 和标题 */}
      <div className={styles.left}>
        <div className={styles.logo}>
          {/* LOGO图片 url 在 CSS 设置 */}
          <div className={styles.logoIcon}></div>
        </div>
        <Text className={styles.title}>Edu Platform</Text>
      </div>
      
      {/* 右侧用户信息和主题切换 */}
      <div className={styles.right}>
        {/* 主题切换按钮 */}
        <Button 
          type="text" 
          icon={appState.theme === 'light' ? <MoonOutlined /> : <SunOutlined />}
          onClick={appState.toggleTheme}
          className={styles.themeToggle}
          title={appState.theme === 'light' ? '切换到深色模式' : '切换到浅色模式'}
        />
        
        <Dropdown menu={{ items }} placement="bottomRight">
          <div className={styles.avatarWrapper}>
              <Avatar size="large" icon={<UserOutlined />} />
              <span className={styles.userName}>{appState.currentUser?.name}</span>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default HeaderBar;
