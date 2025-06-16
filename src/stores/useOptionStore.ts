import { getOptions, OptionResponse } from "@/apis/options";
import { create } from "zustand";

interface OptionStore {
  options: OptionResponse | null;
  hasFetched: boolean;
  fetchOptions: () => Promise<void>;
}

export const useOptionStore = create<OptionStore>((set, get) => ({
  options: null,
  hasFetched: false,
  fetchOptions: async () => {
    if (get().hasFetched) return;
    try {
      const data = await getOptions();
      set({ options: data, hasFetched: true });
    } catch (error) {
      console.error("옵션 불러오기 실패", error);
    }
  },
}));
