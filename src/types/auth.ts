
export type UserRole = 'admin' | 'manager' | 'employee';

export interface User {
  id: string;
  username: string;
  role: UserRole;
}
