import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LajvMessage, LajvStore } from "../interface/interface";

const useLajvStore = create<LajvStore>()(
  
  persist(
    (set) => ({
      messages: [],

      addMessage: (nickname, text) => {
        const newMessage: LajvMessage = {
          nickname,
          text,
          timestamp: new Date().toISOString(),
        };

        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
      },

      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: "lajv-messages",
    }
  )
);

export default useLajvStore;
