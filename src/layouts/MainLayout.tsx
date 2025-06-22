// src/layouts/MainLayout.tsx
import { Layout } from 'antd';
import React, { useState } from 'react';
import CollapseTrigger from '../components/CollapseTrigger/CollapseTrigger';
import HeaderBar from '../components/HeaderBar/HeaderBar';
import MenuSider from '../components/MenuSider/MenuSider';
import styles from './MainLayout.module.css';

const { Sider, Header, Content } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <Layout className={styles.root} >
      {/* 顶部Header横跨整个宽度 */}
      <Header className={styles.header}>
        <HeaderBar />
      </Header>

      {/* 下方左右布局 */}
      <Layout className={styles.body}>
        <Sider
          collapsed={collapsed}
          onCollapse={(val) => setCollapsed(val)}
          width="15rem"
          collapsedWidth="3.75rem"
          breakpoint="lg"
          className={styles.sider}
        >
          <MenuSider />
        </Sider>

        <CollapseTrigger collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

        <Content className={styles.content}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
