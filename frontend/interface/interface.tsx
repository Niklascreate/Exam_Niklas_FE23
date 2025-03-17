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
  createdAt: string;
  interests: string[];
  bio: string;
  token?: string;
  username?: string;
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

export interface LajvMessage {
  nickname: string;
  text: string;
  timestamp: string;
}

export interface LajvStore {
  messages: LajvMessage[];
  addMessage: (nickname: string, text: string) => void;
  clearMessages: () => void;
}

export interface UserStore {
  user: UserDataResponse | null;
  setUser: (user: UserDataResponse) => void;
  clearUser: () => void;
  fetchUserData: (userId: string, token: string) => Promise<UserDataResponse | null>;
}