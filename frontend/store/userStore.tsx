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

      setProfileImage: async (userId: string, imageUrl: string, token: string) => {
        try {
          const response = await fetch(
            `https://cjq9abv0ld.execute-api.eu-north-1.amazonaws.com/update/user/${userId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ profileImage: imageUrl }),
            }
          );
      
          if (!response.ok) {
            throw new Error("Misslyckades att uppdatera profilbilden i backend.");
          }
          set((state) => ({
            user: state.user ? { ...state.user, profileImage: imageUrl } : null,
          }));
        } catch (error) {
          console.error("Fel vid uppdatering av profilbild:", error);
        }
      },

      clearUser: () => {
        set({ user: null });
      },

      fetchUserData: async (userId, token) => {
        try {
          const userData = await fetchUser(userId, token);
          set({ user: { ...userData, token } });
          return { ...userData, token };
        } catch (error) {
          console.error("Misslyckades att hämta användardata:", error);
          return null;
        }
      },
    }),
    {
      name: "user-data",
    }
  )
);

export default useUserStore;