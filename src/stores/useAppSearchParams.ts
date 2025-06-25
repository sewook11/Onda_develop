import { SelectedArea } from "@/app/community/_components/AreaDropdown";
import { Option } from "@/types/post";
import { create } from "zustand";

export type SearchParams = {
  category: Option;
  interest: Option;
  area: SelectedArea;
  keyword: string;
};

const defaultParams: SearchParams = {
  category: { id: 0, name: "카테고리" },
  interest: { id: 0, name: "관심사" },
  area: {
    parentId: { id: 0, name: "시/도" },
    childId: { id: 0, name: "구" },
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
