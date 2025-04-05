export interface UserLoginInterface {
  email: string;
  password: string;
}

export interface UserLoginResultsInterface {
  email: string;
  userName: string;
}

export interface UserSessionInterface {
  email: string;
  userName: string;
  token: string;
}


export interface UserRegisterInterface {
  email: string;
  userName: string;
  password: string;
}
