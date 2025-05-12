export interface UserLoginInterface {
  email: string;
  password: string;
}

export interface UserLoginResultsInterface {
  is_admin: boolean;
  email: string;
  username: string;
  token: string;
}

export interface UserSessionInterface {
  email: string;
  username: string;
  token: string;
  is_admin: boolean;
}

export interface UserRegisterInterface {
  email: string;
  username: string;
  password: string;
}
