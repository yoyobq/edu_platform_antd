// src/access/rbac.ts
export type Role = 'admin' | 'teacher' | 'student';

export interface User {
  id: number;
  name: string;
  roles: Role[];
}

// 当前登录用户（真实场景从后端或 token 拿）
export const currentUser: User = {
  id: 1,
  name: 'Alex',
  roles: ['admin'],
};

// 菜单与权限映射
export const roleMenu = {
  admin: ['/', '/admin', '/profile'],
  teacher: ['/', '/profile'],
  student: ['/', '/profile'],
};

export function hasAccess(path: string, user: User = currentUser) {
  return user.roles.some((role) => roleMenu[role]?.includes(path));
}
