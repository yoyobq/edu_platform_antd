// src/access/types.ts
// 角色类型定义
export type Role = 
  | 'superAdmin'
  | 'admin'
  | 'manager'
  | 'teacher'
  | 'academicAssistant'
  | 'teachingAssistant'
  | 'student';

// 角色层级结构类型
export type RoleHierarchy = Record<Role, Role[]>;

// 权限访问对象类型
export interface AccessPermissions {
  canSuperAdmin: boolean;
  canAdmin: boolean;
  canManager: boolean;
  canTeacher: boolean;
  canAcademicAssistant: boolean;
  canTeachingAssistant: boolean;
  canStudent: boolean;
}