"use client";

import React from "react";
import PostForm, { PostFormData } from "./_components/PostForm";
import { useCreatePost } from "@/hooks/usePost";
import { useModalStore } from "@/stores/useModalStore";
import axios from "axios";
import { PostFailModal, PostSuccessModal } from "./_components/PostModal";
import { preparePostPayload } from "@/utils/preparePostPayload";
import { PostCreatePayload } from "@/apis/post";

export default function Page() {
  const { openModal } = useModalStore();
  const createPost = useCreatePost();

  const handleSubmit = async (formData: PostFormData) => {
    let payload: PostCreatePayload;

    try {
      payload = await preparePostPayload(formData);
    } catch (error) {
      openModal("PostFailModal", {
        message: "파일 업로드에 실패했습니다.",
      });
      console.error("파일 업로드 실패:", error);
      return;
    }

    try {
      const data = await createPost.mutateAsync(payload);
      openModal("PostSuccessModal", {postId: data.id});
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "서버 오류가 발생했습니다."
        : "알 수 없는 오류가 발생했습니다.";
      openModal("PostFailModal", { message });
      console.error("게시글 등록 실패:", error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full my-20 max-w-[1440px] px-4 md:px-[160px] mx-auto">
      <div className="w-full flex justify-between">
        <h1 className="text-xl font-bold text-left w-full">글 쓰기</h1>
      </div>
      <PostForm mode="create" onSubmit={handleSubmit} />

      <PostSuccessModal />
      <PostFailModal />
    </div>
  );
}
