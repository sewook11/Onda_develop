import Modal from "@/components/common/Modal";
import { ModalData, useModalStore } from "@/stores/useModalStore";
import { AlertCircle, CheckCircle, LogInIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export function PostSuccessModal() {
  const router = useRouter();
  const { modals, modalData, closeModal } = useModalStore();

  const isOpen = modals["PostSuccessModal"];
  const postId = modalData["PostSuccessModal"] as ModalData | undefined;

  if (!isOpen || !postId) return null;

  return (
    <Modal modalKey={"PostSuccessModal"}>
      <div className="flex flex-col gap-10 justify-center items-center w-full py-10">
        <CheckCircle color="#2D60FF" size={60} />
        <h2 className="text-md text-center whitespace-pre-line">
          게시글이 성공적으로 등록되었습니다.
        </h2>
        <div className="flex gap-4">
          <button
            onClick={() => {
              closeModal("PostSuccessModal");
              router.push(`/community/${postId}`);
            }}
            className="text-sm underline text-gray-600 font-medium"
          >
            게시글 보러가기
          </button>
          <button
            onClick={() => {
              closeModal("PostSuccessModal");
              router.push("/community");
            }}
            className="text-sm underline text-gray-600 font-medium"
          >
            목록으로 가기
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function PostFailModal() {
  const { modals, modalData, closeModal } = useModalStore();
  const router = useRouter();

  const isOpen = modals["PostFailModal"];
  const messageObj = modalData["PostFailModal"] as { message?: string };
  const message =
    typeof messageObj?.message === "string"
      ? messageObj.message
      : "등록에 실패했습니다.\n다시 시도해주세요.";

  if (!isOpen) return null;

  return (
    <Modal modalKey="PostFailModal">
      <div className="flex flex-col gap-10 justify-center items-center w-full py-10">
        <AlertCircle color="#FF4B4A" size={60} />
        <div className="flex flex-col gap-4 justify-center items-center w-full mb-4">
          <h2 className="text-md text-center whitespace-pre-line">{message}</h2>
          <p>다시 시도해주세요.</p>
        </div>
        <button
          onClick={() => {
            closeModal("PostFailModal");
            router.back();
          }}
          className="text-sm underline text-gray-600 font-medium"
        >
          확인
        </button>
      </div>
    </Modal>
  );
}

export function LoginRequiredModal() {
  const { modals, closeModal } = useModalStore();
  const router = useRouter();

  const isOpen = modals["LoginRequiredModal"];

  if (!isOpen) return null;

  return (
    <Modal modalKey="LoginRequiredModal">
      <div className="flex flex-col gap-10 justify-center items-center w-full py-10">
        <LogInIcon color="#2D60FF" size={60} />
        <div className="flex flex-col gap-4 justify-center items-center w-full mb-4">
          <h2 className="text-md text-center whitespace-pre-line">
            로그인이 필요한 서비스입니다.
          </h2>
          <p>로그인 후 다시 시도해주세요.</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => {
              closeModal("LoginRequiredModal");
              router.push(`/login`);
            }}
            className="text-sm underline text-gray-600 font-medium"
          >
            로그인 하러가기
          </button>
          <button
            onClick={() => {
              closeModal("LoginRequiredModal");
              router.push("/community");
            }}
            className="text-sm underline text-gray-600 font-medium"
          >
            목록으로 가기
          </button>
        </div>
      </div>
    </Modal>
  );
}
