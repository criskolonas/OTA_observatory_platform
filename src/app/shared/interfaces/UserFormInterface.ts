export enum RoleEnum {
  ADMIN = 1,
  USER = 2,
}

export interface SessionDataType {
  username: string;
  shouldDisplayNav: boolean;
  role: Role[];
}

export interface Role {
  id: RoleEnum;
  name: string;
}
export interface UserLoginInterface {
  email: string;
  password: string;
}
export interface User {
  username: string;
  email: string;
  created_at: string;
  role: Role[];
}

export interface UserDataTableType {
  username: string;
  email: string;
  created_at: string;
  isAdmin: boolean;
}

export interface UserLoginResultsInterface {
  email: string;
  username: string;
  role: Role[];
}

export interface UserSessionInterface {
  email: string;
  username: string;
}

export interface UserRegisterInterface {
  email: string;
  username: string;
  password: string;
}
