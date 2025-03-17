export interface Interests {
  first: string;
  second: string;
  third: string;
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  nickname: string;
  email: string;
  token: string;
  interests: string[];
}

export interface rampljuset {
  id: string,
  imageUrl: string;
}

export interface UserDataResponse {
  id: string;
  firstname: string;
  lastname: string;
  nickname: string;
  email: string;
  interests: string[];
  bio: string;
  token?: string;
}

export interface LoginRequest {
  nickname: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface RegisterData {
  firstname: string;
  lastname: string;
  nickname: string;
  email: string;
  password: string;
}
