import type { AccessPermissions, InitialState, Role, RoleHierarchy } from './types';

/**
 * RBAC (Role-Based Access Control) 基于角色的访问控制系统
 * 
 * 功能说明：
 * 1. 定义角色层级结构，支持角色继承
 * 2. 根据用户角色自动计算有效权限
 * 3. 提供权限检查函数供全局使用
 * 
 * 角色层级（从高到低）：
 * superAdmin > admin > manager > teacher > academicAssistant/teachingAssistant > student
 */

/**
 * 权限继承结构配置
 * 
 * 说明：
 * - 每个角色可以继承其下级角色的所有权限
 * - 例如：admin 角色自动拥有 manager、teacher、academicAssistant、teachingAssistant 的权限
 * - 支持未来扩展新角色和权限关系
 */
const roleHierarchy: RoleHierarchy = {
  // 超级管理员：拥有所有权限
  superAdmin: [
    'admin',
    'manager',
    'teacher',
    'academicAssistant',
    'teachingAssistant',
    'student',
  ],
  // 管理员：拥有除超级管理员外的所有权限
  admin: ['manager', 'teacher', 'academicAssistant', 'teachingAssistant'],
  // 经理：拥有教学相关权限
  manager: ['teacher', 'academicAssistant', 'teachingAssistant'],
  // 教师：拥有助教权限
  teacher: ['teachingAssistant'],
  // 学术助理：无继承权限
  academicAssistant: [],
  // 教学助理：拥有学生权限
  teachingAssistant: ['student'],
  // 学生：基础权限，无继承
  student: [],
};

/**
 * 扩展用户角色，计算所有有效权限
 * 
 * @param roles - 用户直接拥有的角色列表
 * @param hierarchy - 角色层级结构
 * @returns 包含所有有效权限的角色数组（去重后）
 * 
 * 工作原理：
 * 1. 使用深度优先搜索（DFS）遍历角色继承树
 * 2. 将用户角色及其所有下级角色添加到结果集
 * 3. 使用 Set 自动去重，避免重复权限
 * 
 * 示例：
 * - 输入：['admin'] 
 * - 输出：['admin', 'manager', 'teacher', 'academicAssistant', 'teachingAssistant']
 */
function expandRoles(roles: Role[], hierarchy: RoleHierarchy): Role[] {
  const result = new Set<Role>();

  // 深度优先搜索函数：递归添加角色及其下级角色
  const dfs = (role: Role) => {
    if (!result.has(role)) {
      result.add(role); // 添加当前角色
      // 递归添加所有下级角色
      (hierarchy[role] || []).forEach(dfs);
    }
  };

  // 对用户的每个直接角色执行 DFS
  roles.forEach(dfs);
  return Array.from(result);
}

/**
 * 构建权限访问对象，供全局权限检查使用
 * 
 * @param initialState - 包含当前用户信息的初始状态
 * @returns 权限检查对象，包含各角色的权限检查函数
 * 
 * 使用方式：
 * ```typescript
 * const permissions = access({ currentUser: { accessGroup: ['admin'] } });
 * if (permissions.canAdmin) {
 *   // 执行管理员操作
 * }
 * ```
 * 
 * 权限检查逻辑：
 * 1. 获取用户的直接角色列表
 * 2. 通过 expandRoles 计算所有有效权限
 * 3. 返回各角色的权限检查函数
 */
export default function access(initialState: InitialState): AccessPermissions {
  // 获取用户角色，默认为空数组
  const userRoles = initialState.currentUser?.accessGroup ?? [];
  
  // 计算用户的所有有效权限（包括继承权限）
  const effectiveRoles = expandRoles(userRoles, roleHierarchy);

  /**
   * 检查用户是否拥有指定角色权限
   * @param target - 目标角色
   * @returns 是否拥有该角色权限
   */
  const hasRole = (target: Role): boolean => effectiveRoles.includes(target);

  // 返回权限检查对象
  return {
    canSuperAdmin: hasRole('superAdmin'),        // 超级管理员权限
    canAdmin: hasRole('admin'),                  // 管理员权限
    canManager: hasRole('manager'),              // 经理权限
    canTeacher: hasRole('teacher'),              // 教师权限
    canAcademicAssistant: hasRole('academicAssistant'),    // 学术助理权限
    canTeachingAssistant: hasRole('teachingAssistant'),    // 教学助理权限
    canStudent: hasRole('student'),              // 学生权限
  };
}

/**
 * 使用示例：
 * 
 * 1. 在组件中使用：
 * ```typescript
 * const permissions = access({ currentUser: { accessGroup: ['teacher'] } });
 * 
 * // 检查权限
 * if (permissions.canTeacher) {
 *   // 显示教师功能
 * }
 * 
 * if (permissions.canStudent) {
 *   // 由于教师继承了学生权限，这里也会返回 true
 * }
 * ```
 * 
 * 2. 在路由守卫中使用：
 * ```typescript
 * const permissions = access(initialState);
 * if (!permissions.canAdmin) {
 *   // 重定向到无权限页面
 * }
 * ```
 */