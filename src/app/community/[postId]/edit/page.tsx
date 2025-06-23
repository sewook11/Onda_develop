"use client";

import { useParams, useRouter } from "next/navigation";
import { useFetchPost, useUpdatePost } from "@/hooks/usePost";
import PostForm, { PostFormData } from "../../write/_components/PostForm";
import { preparePostPayload } from "@/utils/preparePostPayload";
import { useModalStore } from "@/stores/useModalStore";

export default function PostEditPage() {
  const router = useRouter();
  const { postId } = useParams();
  const { data: post, isLoading } = useFetchPost(Number(postId));
  const { openModal } = useModalStore();
  const updatePost = useUpdatePost();

  const handleUpdate = async (updatedData: PostFormData) => {
    try {
      const payload = await preparePostPayload(updatedData);

      const data = await updatePost.mutateAsync({
        postId: Number(postId),
        payload,
      });

      openModal("PostSuccessModal", data.id);
      router.push(`/community/${data.id}`);
    } catch (error) {
      const message = "게시글 수정에 실패했습니다.";
      openModal("PostFailModal", { message });
      console.error("수정 실패:", error);
    }
  };
  if (!post) {
    return <div className="text-center py-20">게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex flex-col items-center w-full my-20 max-w-[1440px] px-4 md:px-[160px] mx-auto">
      {isLoading && <p>로딩중입니다...</p>}
      <div className="w-full flex justify-between">
        <h1 className="text-xl font-bold text-left w-full">글 쓰기</h1>
      </div>
      <PostForm
        mode="edit"
        initialValue={post}
        onSubmit={handleUpdate}
        onCancel={() => router.back()}
      />
    </div>
  );
}
