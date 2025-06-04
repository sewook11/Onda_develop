import { useEffect } from "react";
import { ModalProps } from "@/types/common";
import { useModalStore } from "@/stores/useModalStore";
import CloseButton from "./Buttons/CloseButton";

const Modal = ({ modalKey, children, className = "" }: ModalProps) => {
  const { modals, closeModal } = useModalStore();
  const isOpen = modals[modalKey] ?? false;
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal(modalKey);
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, modalKey, closeModal]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-500/10">
      <div className="absolute inset-0" onClick={() => closeModal(modalKey)} />
      <div
        className={`modal-wrapper relative bg-white dark:bg-dark-800 rounded-2xl shadow-xl max-h-screen md:max-w-full max-w-4xl p-[60px] ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton
          onClick={() => closeModal(modalKey)}
          size={32}
          className="absolute top-6 right-6 p-1 text-gray-800"
        />
        {/* children 부분만 세로 스크롤 */}
        <div className="overflow-y-auto max-h-[70vh] pr-2">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
