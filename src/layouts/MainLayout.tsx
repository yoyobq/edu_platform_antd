// src/layouts/MainLayout.tsx
import { Layout } from 'antd';
import React from 'react';
import HeaderBar from '../components/HeaderBar/HeaderBar';
import MenuSider from '../components/MenuSider/MenuSider';
import styles from './MainLayout.module.css';

const { Sider, Header, Content } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout className={styles.root}>
      {/* 顶部Header横跨整个宽度 */}
      <Header className={styles.header}>
        <HeaderBar />
      </Header>
      
      {/* 下方左右布局 */}
      <Layout className={styles.body}>
        <Sider
          width="15rem"
          collapsedWidth="3.75rem"
          breakpoint="lg"
          className={styles.sider}
        >
          <MenuSider />
        </Sider>
        
        <Content className={styles.content}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
