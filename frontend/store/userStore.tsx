import { create } from "zustand";
import { fetchUser } from "../api/api";
import { UserDataResponse } from '../interface/interface';

interface UserStore {
  user: UserDataResponse | null;
  setUser: (user: UserDataResponse) => void;
  clearUser: () => void;
  fetchUserData: (userId: string, token: string) => Promise<UserDataResponse | null>;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null }),

  fetchUserData: async (userId, token) => {
    try {
      const userData = await fetchUser(userId, token);
      set({ user: { ...userData, token } });

      console.log("Användardata hämtad och sparad i Zustand:", userData);
      
      return { ...userData, token };
      
    } catch (error) {
      console.error("Misslyckades att hämta användardata:", error);
      return null;
    }
  }
}));

export default useUserStore;
