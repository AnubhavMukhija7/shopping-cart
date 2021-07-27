export interface User {
  id: number;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  phonNumber: string;
  picture: string | null;
  lastIp: string | null;
  lastLogin: string | null;
  loginCount: number;
  isActive: boolean;
}

export type Users = User[];
