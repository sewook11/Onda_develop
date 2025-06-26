import { create } from 'zustand';

// 모달 데이터 타입 정의
interface ModalData {
  meetId?: number | string;
  [key: string]: unknown;
}

interface ModalState {
  modals: Record<string, boolean>;
  modalData: Record<string, ModalData>;
  openModal: (key: string, data?: ModalData) => void;
  closeModal: (key: string) => void;
  closeAllModals: () => void;
  isModalOpen: (key: string) => boolean;
}

export const useModalStore = create<ModalState>((set, get) => ({
  modals: {},
  modalData: {},

  openModal: (key, data) =>
    set((state) => ({
      modals: { ...state.modals, [key]: true },
      modalData: { ...state.modalData, [key]: data || {} },
    })),

  closeModal: (key) =>
    set((state) => {
      const newModalData = { ...state.modalData };
      delete newModalData[key];
      return {
        modals: { ...state.modals, [key]: false },
        modalData: newModalData,
      };
    }),

  closeAllModals: () =>
    set({
      modals: {},
      modalData: {},
    }),

  isModalOpen: (key) => get().modals[key] ?? false,
}));
