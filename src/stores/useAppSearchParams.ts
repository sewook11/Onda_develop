import { create } from "zustand";

export type SearchParams = {
  category: number;
  interest: number;
  area: {
    parentId: number;
    childId: number;
  };
  keyword: string;
};

const defaultParams: SearchParams = {
  category: 0,
  interest: 0,
  area: {
    parentId: 0,
    childId: 0,
  },
  keyword: "",
};

type State = {
  searchParams: SearchParams;
  updateParams: <K extends keyof SearchParams>(
    key: K,
    value: SearchParams[K]
  ) => void;
  resetParams: () => void;
};

export const useAppSearchParams = create<State>((set) => ({
  searchParams: defaultParams,
  updateParams: (key, value) =>
    set((state) => ({
      searchParams: {
        ...state.searchParams,
        [key]: value,
      },
    })),
  resetParams: () =>
    set(() => ({
      searchParams: defaultParams,
    })),
}));
