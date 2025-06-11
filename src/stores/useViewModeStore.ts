// stores/useViewModeStore.ts
import { create } from 'zustand';

type ViewMode = 'user' | 'leader';

type ViewModeStore = {
  viewMode: ViewMode;
  toggleViewMode: () => void;
  setViewMode: (mode: ViewMode) => void;
};

export const useViewModeStore = create<ViewModeStore>((set, get) => ({
  viewMode: 'user',
  toggleViewMode: () =>
    set({ viewMode: get().viewMode === 'user' ? 'leader' : 'user' }),
  setViewMode: (mode) => set({ viewMode: mode }),
}));
