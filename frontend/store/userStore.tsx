import { create } from 'zustand';

interface UserStore {
  user: { email: string; nickname: string; token: string } | null;
  setUser: (user: { email: string; nickname: string; token: string }) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
