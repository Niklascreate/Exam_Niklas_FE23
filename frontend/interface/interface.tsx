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
  profileImage?: string;
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
  profileImage?: string;
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
  profileImage?: string;
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
  setProfileImage: (userId: string, imageUrl: string, token: string) => Promise<void>;
  clearUser: () => void;
  fetchUserData: (userId: string, token: string) => Promise<UserDataResponse | null>;
}

export interface OnlineUser {
    id: string;
    profileImage: string;
    nickname: string;
}

export interface WallButtonProps {
  onClick: () => void;
}

export interface WallMessageProps {
  userId: string;
  profileImage?: string;
  nickname: string;
  createdAt: string;
  message: string;
}

export interface WallMessageType {
  id: string;
  userId: string;
  nickname: string;
  profileImage?: string;
  message: string;
  createdAt: string;
}

export interface Friend {
  id: string;
  userId?: string;
  firstname: string;
  lastname: string;
  nickname: string;
  profileImage: string;
  createdAt: string;
}

export interface FriendRequest {
  id: string;
  nickname: string;
  profileImage: string;
  firstname: string;
  lastname: string;
}