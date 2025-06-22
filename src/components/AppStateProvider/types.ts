import type { AccessPermissions, Role } from '../../access/types';

export interface CurrentUser {
  id: number;
  name: string;
  accessGroup: Role[];
}

export interface AppState {
  currentUser?: CurrentUser;
  access: AccessPermissions;
}
