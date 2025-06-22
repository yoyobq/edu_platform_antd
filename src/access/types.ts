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

// 用户信息类型
export interface CurrentUser {
  accessGroup?: Role[];
}

// 初始状态类型
export interface InitialState {
  currentUser?: CurrentUser;
}

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