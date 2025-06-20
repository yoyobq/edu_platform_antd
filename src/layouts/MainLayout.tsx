import { Layout } from 'antd';
import React from 'react';
import MenuSider from '../components/MenuSider';
// import HeaderBar from '../components/HeaderBar'; // 可自定义
// import FooterBar from '../components/FooterBar'; // 可自定义
import styles from './MainLayout.module.css'; // 引入同名 CSS Modules

const { Sider, Content } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Layout className={styles.root}>
  <Sider
    width={240}
    breakpoint="lg"
    collapsedWidth={60}
    className={styles.sider}
  >
    <MenuSider />
  </Sider>
    <Layout>
      {/* <Header className={styles.header}>
        <HeaderBar />
      </Header> */}
      <Content className={styles.content}>{children}</Content>
      {/* <Footer className={styles.footer}>
        <FooterBar />
      </Footer> */}
    </Layout>
  </Layout>
);

export default MainLayout;
