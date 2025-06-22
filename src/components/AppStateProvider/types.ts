import type { AccessPermissions, Role } from '../../access/types';

export interface CurrentUser {
  id: number;
  name: string;
  accessGroup: Role[];
}

export type Theme = 'light' | 'dark';

export interface AppState {
  currentUser?: CurrentUser;
  access: AccessPermissions;
  theme: Theme;
  toggleTheme: () => void;
}
