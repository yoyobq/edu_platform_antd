// src/router/ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { currentUser, hasAccess } from '../access/rbac';

export default function ProtectedRoute({ children, path }: { children: React.ReactNode; path: string }) {
  const location = useLocation();
  if (!hasAccess(path, currentUser)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}
