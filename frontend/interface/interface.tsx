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
  token: string | undefined;
  interests: string[];
  friends?: string[];
  bio?: string;
  createdAt?: string;
}

export interface UserProfileResponse {
  id: string;
  firstname: string;
  lastname: string;
  nickname: string;
  email: string;
  token?: string
  interests?: string[];
  friends?: string[];
  bio?: string;
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
  friends?: string[];
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

export interface OnlineUser {
    id: string;
    avatar: string;
    status: "online" | "away" | "offline";
}

export interface WallButtonProps {
  onClick: () => void;
}

export interface WallMessageProps {
  userId: string;
  nickname: string;
  message: string;
  createdAt: string;
}

export interface WallMessageType {
  id: string;
  userId: string;
  nickname: string;
  content: string;
  message: string;
  createdAt: string;
}
