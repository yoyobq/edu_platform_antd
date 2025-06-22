import React from 'react';
import type { AccessPermissions } from '../access/types';

// 定义路由类型接口
export interface RouteConfig {
  path: string;
  element?: React.ReactElement;
  label: string;
  permission: boolean | keyof AccessPermissions;
  layout?: React.ComponentType<any> | null;
  children?: RouteConfig[];
  icon?: React.ReactNode; // 新增 icon 字段
}