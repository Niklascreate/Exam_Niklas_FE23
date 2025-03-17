import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchUser } from "../api/api";
import { UserStore } from "../interface/interface";

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,

      setUser: (user) => {
        set({ user });
      },

      clearUser: () => {
        set({ user: null });
      },

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
    }),
    {
      name: "user-data",
    }
  )
);

export default useUserStore;
