import { create } from "zustand";

export type SearchParams = {
  category_id: number;
  interest_id: number;
  digitalLevel_id: number;
  keyword: string;
  sido: string;
  districts: string;
};

const defaultParams: SearchParams = {
  category_id: 0,
  interest_id: 0,
  keyword: "",
  digitalLevel_id: 0,
  sido: "",
  districts: "",
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
