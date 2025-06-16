"use client"

import React from "react";
import PostForm from "./_components/PostForm";
import { useCreatePost } from "@/hooks/usePost";
import { PostCreatePayload } from "@/apis/post";
import { PostFormData } from "@/types/post";
import { uploadFiles } from "@/apis/file";

export default function Page() {
  const { mutate: createPost, isSuccess, isError } = useCreatePost();

  const handleSubmit = async (formData: PostFormData) => {
    let fileId: number | undefined = undefined;

    if (formData.file instanceof File) {
      const uploaded = await uploadFiles(formData.file);
      fileId = uploaded.id;
    }

    const payload: PostCreatePayload = {
      title: formData.title,
      content: formData.content,
      category: formData.category ?? 0,
      interest: formData.interest ?? 0,
      area: formData.area ?? 0,
      file: fileId ?? 0,
    };
    createPost(payload)
  };

  return (
    <div className="flex flex-col items-center w-full my-20 max-w-[1440px] px-4 md:px-[160px] mx-auto">
      <div className="w-full flex justify-between">
        <h1 className="text-xl font-bold text-left w-full">글 쓰기</h1>
      </div>
      <PostForm mode="create" onSubmit={handleSubmit} />
      {isSuccess && <p>게시글 작성 완료!</p>}
      {isError && <p>작성 실패. 다시 시도해주세요.</p>}
    </div>
  );
}
