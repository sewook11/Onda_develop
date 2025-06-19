"use client";

import React from "react";
import PostForm, { PostFormData } from "./_components/PostForm";
import { useCreatePost } from "@/hooks/usePost";
import { PostCreatePayload } from "@/apis/post";
import { uploadFiles } from "@/apis/file";
import { useModalStore } from "@/stores/useModalStore";
import axios from "axios";
import { PostFailModal, PostSuccessModal } from "./_components/PostModal";

export default function Page() {
  const { openModal } = useModalStore();
  const createPost = useCreatePost();

  const handleSubmit = async (formData: PostFormData) => {
    let fileId: number | undefined = undefined;

    try {
      if (formData.file instanceof File) {
        const uploaded = await uploadFiles(formData.file);
        fileId = uploaded.id;
      }
    } catch (error) {
      openModal("PostFailModal", {
        message: "파일 업로드에 실패했습니다.",
      });
      console.log(error);
      return;
    }
    const payload: PostCreatePayload = {
      title: formData.title,
      content: formData.content,
      category: formData.category ?? 0,
      interest: formData.interest ?? undefined,
      area: formData.area?.childId ?? undefined,
      file: fileId ?? undefined,
    };

    createPost.mutate(payload, {
      onSuccess: (data) => {
        openModal("PostSuccessModal", data.id);
        console.log("성공 모달 열림", data.id);
      },
      onError: (error) => {
        let errorMessage = "서버 오류가 발생했습니다.";

        if (axios.isAxiosError(error)) {
          if (!error.response) {
            errorMessage =
              "서버에 연결할 수 없습니다. 인터넷 연결을 확인해주세요.";
          } else {
            const responseMessage = error.response.data?.message;
            errorMessage =
              typeof responseMessage === "string"
                ? responseMessage
                : errorMessage;
          }
        } else {
          errorMessage = error?.message || errorMessage;
        }

        openModal("PostFailModal", { message: errorMessage });
        console.log("실패 모달 열림", errorMessage);
      },
    });
    console.log("최종 제출", formData);
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
