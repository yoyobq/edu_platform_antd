import type { ReactElement } from 'react';
import React from 'react';

// 定义路由类型接口
export interface RouteConfig {
  path: string;
  element?: ReactElement;
  label: string;
  permission: boolean | ((user: { roles: string[] }) => boolean);
  layout?: React.ComponentType<any> | null;
  children?: RouteConfig[];
  icon?: React.ReactNode; // 新增 icon 字段
}