export interface User {
  id: number;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  picture: string | null;
  lastIp: string | null;
  lastLogin: string | null;
  loginCount: number;
  isActive: boolean;
  password: string;
  prime: boolean;
  addressOne: string;
  addressTwo: string;
  city: string;
  country: string;
  pinCode: string;
  state: string;
}

export type Users = User[];
