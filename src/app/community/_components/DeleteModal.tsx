import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { useModalStore } from "@/stores/useModalStore";
import React from "react";

export interface DeleteModalData {
  id?: number;
  postId?: number;
  type?: "post" | "comment";
}

export interface DeleteModalProps {
  onDelete?: (data: DeleteModalData) => void;
}

export default function DeleteModal({ onDelete }: DeleteModalProps) {
  const { modalData, closeModal } = useModalStore();
  const data = modalData["DeleteModal"] as DeleteModalData | undefined;

  const handleDelete = () => {
    if (!data) return;
    onDelete?.(data);
    closeModal("DeleteModal");
  };

  return (
    <Modal modalKey="DeleteModal">
      <h3 className="my-10 text-center text-md">삭제하시겠습니까?</h3>
      <div className="flex gap-2">
        <Button color="gray" onClick={() => closeModal("DeleteModal")}>
          취소하기
        </Button>
        <Button onClick={handleDelete}>삭제하기</Button>
      </div>
    </Modal>
  );
}
