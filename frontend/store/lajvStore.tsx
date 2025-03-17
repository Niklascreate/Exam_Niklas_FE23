import { create } from "zustand";
import { LajvMessage, LajvStore } from '../interface/interface';

const useLajvStore = create<LajvStore>((set) => ({
  messages: [],

  addMessage: (username, text) => {
    const newMessage: LajvMessage = {
      username,
      text,
      timestamp: new Date().toISOString(),
    };

    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },

  clearMessages: () => set({ messages: [] }),
}));

export default useLajvStore;
