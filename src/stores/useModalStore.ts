import { create } from "zustand";

interface ModalState {
  modals: Record<string, boolean>;
  modalData: Record<string, unknown>;
  openModal: (key: string, data?: unknown) => void;
  closeModal: (key: string) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modals: {},
  modalData: {},
  openModal: (key, data) =>
    set((state) => ({
      modals: { ...state.modals, [key]: true },
      modalData: { ...state.modalData, [key]: data },
    })),
  closeModal: (key) =>
    set((state) => ({
      modals: { ...state.modals, [key]: false },
      modalData: { ...state.modalData, [key]: undefined },
    })),
}));