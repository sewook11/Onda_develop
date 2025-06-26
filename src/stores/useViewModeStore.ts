import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ViewMode = 'user' | 'leader';

type ViewModeStore = {
  viewMode: ViewMode;
  toggleViewMode: () => void;
  setViewMode: (mode: ViewMode) => void;
};

export const useViewModeStore = create(
  persist<ViewModeStore>(
    (set, get) => ({
      viewMode: 'user',
      toggleViewMode: () =>
        set({ viewMode: get().viewMode === 'user' ? 'leader' : 'user' }),
      setViewMode: (mode) => set({ viewMode: mode }),
    }),
    {
      name: 'view-mode-storage', // localStorage 키 이름
    }
  )
);
