// src/layouts/MainLayout.tsx
import { Layout } from 'antd';
import React from 'react';
import MenuSider from '../components/MenuSider';
const { Header, Sider, Content } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Layout style={{ minHeight: '100vh' }}>
    <Sider width={200}>
      <MenuSider />
    </Sider>
    <Layout>
      <Header style={{ background: '#fff', padding: 0 }}>智能平台后台</Header>
      <Content style={{ margin: '16px', background: '#fff', minHeight: 280 }}>{children}</Content>
    </Layout>
  </Layout>
);

export default MainLayout;
