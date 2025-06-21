import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './router/ProtectedRoute';
import { routes } from './router/routes';

const App: React.FC = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map(({ path, element, layout: Layout, permission }) => {
          const isProtected = typeof permission === 'function';

          // 包装受保护的页面
          let content = isProtected ? (
            <ProtectedRoute path={path}>{element}</ProtectedRoute>
          ) : (
            element
          );

          // 决定是否使用 Layout 包裹
          if (Layout) {
            content = <Layout>{content}</Layout>;
          }

          return <Route key={path} path={path} element={content} />;
        })}
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
