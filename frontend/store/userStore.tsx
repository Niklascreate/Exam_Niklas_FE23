import { create } from "zustand";
import { fetchUser } from '../api/api';
import { User } from '../interface/interface'; 

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  fetchUserData: (userId: string, token: string) => Promise<void>;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),

  fetchUserData: async (userId, token) => {
    try {
      const userData = await fetchUser(userId, token);
      set({ user: userData });
    } catch (error) {
      console.error("Misslyckades att hämta användardata:", error);
    }
  },
}));

export default useUserStore;