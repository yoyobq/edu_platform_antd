// src/router/ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppState } from '../hooks/useAppState';
import type { AccessPermissions } from '../access/types';

export default function ProtectedRoute({
  children,
  permission,
}: {
  children: React.ReactNode;
  permission: boolean | keyof AccessPermissions;
}) {
  const location = useLocation();
  const { access } = useAppState();

  // 如果 permission 是 boolean 类型且为 true，直接允许访问
  if (typeof permission === 'boolean') {
    if (!permission) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return <>{children}</>;
  }

  // 如果 permission 是权限键，检查对应的权限
  if (!access[permission]) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
