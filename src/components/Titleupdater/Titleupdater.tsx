// src/components/TitleUpdater/TitleUpdater.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { type RouteConfig } from './../../router/routes';

export default function TitleUpdater({ allRoutes }: { allRoutes: RouteConfig[] }) {
  const location = useLocation();
  useEffect(() => {
    const current = allRoutes.find(r => r.path === location.pathname);
    document.title = current?.label
      ? `${current.label} - Edu Platform`
      : 'Edu Platform';
  }, [location, allRoutes]);
  return null;
}
