export interface UserLoginInterface {
  email: string;
  password: string;
}

export interface UserLoginResultsInterface {
  token:string;
}

export interface UserRegisterInterface {
  email: string;
  userName: string;
  password: string;
}
