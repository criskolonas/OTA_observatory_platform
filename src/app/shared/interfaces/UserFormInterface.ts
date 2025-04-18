export interface UserLoginInterface {
  email: string;
  password: string;
}

export interface UserLoginResultsInterface {
  email: string;
  username: string;
  token:string;
}

export interface UserSessionInterface {
  email: string;
  username: string;
  token: string;
}


export interface UserRegisterInterface {
  email: string;
  username: string;
  password: string;
}
