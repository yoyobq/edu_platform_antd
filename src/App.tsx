// src/App.tsx
import { ConfigProvider, theme } from 'antd';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TitleUpdater from './components/Titleupdater/Titleupdater';
import { useAppState } from './hooks/useAppState';
import { useResponsiveFontSize } from './hooks/useResponseiveFontSize';
import { PageSkeleton } from './layouts/PageSkeleton';
import ProtectedRoute from './router/ProtectedRoute';
import { flattenRoutes, routes, type RouteConfig } from './router/routes';

const App: React.FC = () => {
  useResponsiveFontSize();
  const appState = useAppState();

  // 扁平化所有路由（包括子路由）
  const allRoutes = flattenRoutes(routes);
  
  const renderRoute = (route: RouteConfig) => {
    const { path, element, layout: Layout, permission } = route;
    const isProtected = permission !== true; // 如果不是 true，则需要权限检查

    // 包装受保护的页面
    let content = isProtected ? (
      <ProtectedRoute permission={permission}>{element}</ProtectedRoute>
    ) : (
      element
    );

    content = Layout ? (
      <Layout>
        <Suspense fallback={<PageSkeleton />}>{content}</Suspense>
      </Layout>
    ) : (
      <Suspense fallback={<PageSkeleton />}>{content}</Suspense>
    );

    return <Route key={path} path={path} element={content} />;
  };

  return (
    <ConfigProvider 
      theme={{ 
        algorithm: appState.theme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        cssVar: true 
      }}
    >
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <TitleUpdater allRoutes={allRoutes} />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {allRoutes.map(renderRoute)}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
