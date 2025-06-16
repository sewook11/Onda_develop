import { deletePost } from "@/apis/post";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { useModalStore } from "@/stores/useModalStore";
import React from "react";

export default function DeleteModal() {
  const { closeModal } = useModalStore();
  const handleDelete = (id: number) => {
    deletePost(id);
    console.log("게시글 삭제");
  };

  return (
    <Modal modalKey="DeleteModal">
      <h3 className="my-10 text-center text-md">삭제하시겠습니까?</h3>
      <div className="flex gap-2">
        <Button color="gray" onClick={() => closeModal("DeleteModal")}>
          취소하기
        </Button>
        <Button onClick={() => handleDelete}>삭제하기</Button>
      </div>
    </Modal>
  );
}
