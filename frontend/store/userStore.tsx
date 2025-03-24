import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchUser } from "../api/api";
import { UserStore } from "../interface/interface";

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,

      setUser: (user) => {
        set({ user });
      },

      setProfileImage: async (userId: string, imageUrl: string, token: string) => {
        set({ loading: true, error: null });
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
            const errorData = await response.json();
            throw new Error(`Fel från backend: ${errorData.message || response.statusText}`);
          }

          set((state) => ({
            user: state.user ? { ...state.user, profileImage: imageUrl } : null,
            loading: false,
          }));

          return { success: true };
        } catch (error) {
          console.error("Fel vid uppdatering av profilbild:", error);
          set({ loading: false, error: error instanceof Error ? error : new Error(String(error)) });
          return { success: false, error: error instanceof Error ? error : new Error(String(error)) };
        }
      },

      clearUser: () => {
        set({ user: null });
      },

      fetchUserData: async (userId: string, token: string) => {
        set({ loading: true, error: null });
        try {
          const userData = await fetchUser(userId, token);
          const defaultProfileImage =
            "https://lunarchat-profile-images.s3.eu-north-1.amazonaws.com/profile-pictures/maskot2+(2).webp";

          const user = {
            ...userData,
            token,
            profileImage: userData.profileImage || defaultProfileImage,
          };

          set({ user, loading: false });
          return user;
        } catch (error) {
          console.error("Misslyckades att hämta användardata:", error);
          set({ loading: false, error: error instanceof Error ? error : new Error(String(error)) });
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
