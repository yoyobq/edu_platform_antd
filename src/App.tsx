import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useResponsiveFontSize } from './hooks/useResponseiveFontSize';
import { PageSkeleton } from './layouts/PageSkeleton';
import ProtectedRoute from './router/ProtectedRoute';
import { flattenRoutes, routes, type RouteConfig } from './router/routes';

const App: React.FC = () => {
  useResponsiveFontSize();

  // 扁平化所有路由（包括子路由）
  const allRoutes = flattenRoutes(routes);

  const renderRoute = (route: RouteConfig) => {
    const { path, element, layout: Layout, permission } = route;
    const isProtected = typeof permission === 'function';

    // 包装受保护的页面
    let content = isProtected ? (
      <ProtectedRoute path={path}>{element}</ProtectedRoute>
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
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {allRoutes.map(renderRoute)}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
