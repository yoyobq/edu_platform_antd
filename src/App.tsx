// src/App.tsx
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './router/ProtectedRoute';
import { routes } from './router/routes';

const App: React.FC = () => (
  <BrowserRouter>
    <MainLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map((route) =>
            route.path === '/login' ? (
              <Route key={route.path} path={route.path} element={route.element} />
            ) : (
              <Route
                key={route.path}
                path={route.path}
                element={<ProtectedRoute path={route.path}>{route.element}</ProtectedRoute>}
              />
            )
          )}
        </Routes>
      </Suspense>
    </MainLayout>
  </BrowserRouter>
);

export default App;
